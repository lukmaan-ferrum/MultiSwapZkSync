// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/SystemContractsCaller.sol";
import "./interfaces/IVersioned.sol";


contract FerrumDeployer is IVersioned {
    string constant public override VERSION = "0.0.1";
    uint256 constant EXTERNAL_HASH = 0x0ddafcd8600839ce553cacb17e362c83ea42ccfd1e8c8b3cb4d075124196dfc0;
    mapping(ContractType => bytes32) bytecodeHashes;

    enum ContractType {
        FiberRouter,        // 0
        FundManager,        // 1
        ForgeFundManager,   // 2
        MultiSwapForge      // 3
    }

    struct InitContractShape {
        ContractType contractType;
        bytes32 bytecodeHash;
    }

    event ContractDeployed(address indexed contractAddress, address indexed owner);

    constructor(InitContractShape[] memory childContracts) {
        for (uint i=0; i<childContracts.length; ++i) {
            bytecodeHashes[childContracts[i].contractType] = childContracts[i].bytecodeHash;
        }
    }

    function deploy(bytes32 salt, ContractType contractType, address owner) external returns (address addr) {
        require(owner != address(0), "Owner address not provided");
        bytes32 _salt = keccak256(abi.encode(salt, EXTERNAL_HASH, owner));
        addr = _deploy(_salt, contractType);
        
        owner != address(0) ? Ownable(addr).transferOwnership(owner) : Ownable(addr).transferOwnership(msg.sender);

        emit ContractDeployed(addr, owner);
    }

    function computeAddress(
        ContractType contractType,
        address owner,
        bytes32 salt
    ) external view returns (address) {
        bytes32 _salt = keccak256(abi.encode(salt, EXTERNAL_HASH, owner));
        bytes32 prefix = keccak256("zksyncCreate2");
        bytes32 inputHash = keccak256("");
        bytes32 addressBytes = keccak256(
            abi.encodePacked(prefix, bytes32(uint256(uint160(address(this)))), _salt, bytecodeHashes[contractType], inputHash)
        );

        return address(uint160(uint256(addressBytes)));
    }

    function _deploy(bytes32 salt, ContractType contractType) internal returns (address addr) {
        (bool success, bytes memory returnData) = SystemContractsCaller.systemCallWithReturndata(
            uint32(gasleft()),
            address(DEPLOYER_SYSTEM_CONTRACT),
            uint128(0),
            abi.encodeCall(
                DEPLOYER_SYSTEM_CONTRACT.create2,
                (salt, bytecodeHashes[contractType], "")
            )
        );

        require(success, "Deployment failed");
        addr = abi.decode(returnData, (address));
    }
}
