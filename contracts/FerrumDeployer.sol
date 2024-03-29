// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "./interfaces/IVersioned.sol";
import "./FiberRouter.sol";
import "./ForgeFundManager.sol";
import "./FundManager.sol";
import "./MultiSwapForge.sol";


contract FerrumDeployer is IVersioned {
	string constant public override VERSION = "0.0.1";
    uint256 constant EXTERNAL_HASH = 0x0ddafcd8600839ce553cacb17e362c83ea42ccfd1e8c8b3cb4d075124196dfc0;
    uint256 constant INTERNAL_HASH = 0x27fd0863a54f729686099446389b11108e6e34e7364d1f8e38a43e1661a07f3a;

    enum ContractType {
        FiberRouter,
        ForgeFundManager,
        FundManager,
        MultiSwapForge
    }

    event Deployed(address);
    event DeployedWithData(address conAddr, address owner);

    
    function deploy(bytes32 salt, ContractType contractType) public returns (address) {
        bytes32 _salt = keccak256(abi.encode(salt, INTERNAL_HASH, msg.sender));
        address addr = _deploy(contractType, _salt);

        emit Deployed(addr);

        return addr;
    }

    function deployOwnable(
        bytes32 salt,
        ContractType contractType,
        address owner,
        bytes calldata data
    ) external returns (address) {
        bytes32 _salt = keccak256(abi.encode(salt, EXTERNAL_HASH, owner, data));
        address addr = _deploy(contractType, _salt);

        if (owner != address(0)) {
            Ownable(addr).transferOwnership(owner);
        }
        
        emit DeployedWithData(addr, owner);

        return addr;
    }

    function computeAddressOwnable(
        bytes32 salt,
        address owner,
        bytes calldata data,
        bytes32 bytecodeHash
    ) external view returns (address addr) {
        bytes32 _salt = keccak256(abi.encode(salt, EXTERNAL_HASH, owner, data));
        addr = _computeAddress(_salt, bytecodeHash);
    }

    function computeAddress(bytes32 salt, bytes32 bytecodeHash, address deployer) external view returns (address addr) {
        bytes32 _salt = keccak256(abi.encodePacked(salt, INTERNAL_HASH, deployer));
        addr = _computeAddress(_salt, bytecodeHash);
    }

    function _deploy(ContractType contractType, bytes32 _salt) internal returns (address addr) {
        if (contractType == ContractType.FiberRouter) {
            FiberRouter a = new FiberRouter{salt: _salt}();
            addr = address(a);
        } else if (contractType == ContractType.ForgeFundManager) {
            ForgeFundManager a = new ForgeFundManager{salt: _salt}();
            addr = address(a);
        } else if (contractType == ContractType.FundManager) {
            FundManager a = new FundManager{salt: _salt}();
            addr = address(a);
        } else if (contractType == ContractType.MultiSwapForge) {
            MultiSwapForge a = new MultiSwapForge{salt: _salt}();
            addr = address(a);
        } else {
            revert("Invalid contract type");
        }
    }

    /**
     * @dev zkSync's account derivation is different, but I haven't actually checked if this works
     */
    function _computeAddress(bytes32 _salt, bytes32 bytecodeHash) internal view returns (address addr) {
        bytes32 input;
        bytes32 inputHash = keccak256(abi.encode(input));
        bytes32 prefix = keccak256(abi.encodePacked("zksyncCreate2"));
        bytes32 addressBytes = keccak256(abi.encodePacked(
            prefix,
            bytes32(uint256(uint160(address(this)))),
            _salt,
            bytecodeHash,
            inputHash
        ));

        addr = address(uint160(uint256(addressBytes)));
    }
}
