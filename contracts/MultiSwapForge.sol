// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./FiberRouterV2.sol";

contract MultiSwapForge is FiberRouterV2 {
    
    address public gasEstimationAddress;

    constructor() FiberRouterV2() {}

    /**
     @dev Sets address authorized to execute gas estimations
     @param _gasEstimationAddress The gas estimation wallet
     */
    function setGasEstimationAddress(address _gasEstimationAddress) external onlyOwner {
        require(
            _gasEstimationAddress != address(0),
            "Gas Estimation address cannot be zero"
        );
        gasEstimationAddress = _gasEstimationAddress;
    }

    // Override and revert the 'withdrawSigned' function
    function withdrawSigned(
        address token,
        address payee,
        uint256 amount,
        bytes32 salt,
        uint256 expiry,
        bytes memory multiSignature
    ) public override {
        revert("Not Supported");
    }
    // This function is only used specifically for GasEstimation & Simulation of withdrawSigned
    function withdrawSignedForGasEstimation(
        address token,
        address payee,
        uint256 amount,
        bytes32 salt,
        uint256 expiry,
        bytes memory multiSignature
    ) external {
        super.withdrawSigned(
            token,
            payee,
            amount,
            salt,
            expiry,
            multiSignature
        );

        require(msg.sender == gasEstimationAddress, "only authorised gas estimation address");
    }

    // Override and revert the 'withdrawSignedAndSwapOneInch' function
    function withdrawSignedAndSwapOneInch(
        address payable to,
        uint256 amountIn,
        uint256 amountOut,
        address foundryToken,
        address targetToken,
        bytes memory oneInchData,
        bytes32 salt,
        uint256 expiry,
        bytes memory multiSignature
    ) public override {
       revert("Not Supported");
    }

    // This function is only used specifically for GasEstimation & Simulation of withdrawSignedAndSwapOneInch
    function withdrawSignedAndSwapOneInchForGasEstimation(
        address payable to,
        uint256 amountIn,
        uint256 amountOut,
        address foundryToken,
        address targetToken,
        bytes memory oneInchData,
        bytes32 salt,
        uint256 expiry,
        bytes memory multiSignature
    ) external {
        // Call the original function from FiberRouter
        super.withdrawSignedAndSwapOneInch(
            to,
            amountIn,
            amountOut,
            foundryToken,
            targetToken,
            oneInchData,
            salt,
            expiry,
            multiSignature
        );

        require(msg.sender == gasEstimationAddress, "only authorised gas estimation address");
    }
}
