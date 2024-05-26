import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";
import { ContractTransactionResponse } from "ethers"
import hre from "hardhat"
import { get } from "http";
const axios = require("axios");

export const callOneInch = async (
    src:string,
    dst:string,
    amount:string,
    from:string,
    chainId:string
) => {

    const url = "https://api.1inch.dev/swap/v6.0/324/swap";

    const config = {
        headers: {
    "Authorization": "Bearer k5YhC6RsrmL96KoqpKJTy9AuRBH61sRg"
    },
        params: {
    "src": "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    "dst": "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
    "amount": "200000000000000",
    "from": "0xe0595a09a154EF11d98C44a4A84D93bB9F46b74E",
    "slippage": "2",
    "disableEstimate": "true"
    }
    };
        

    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const getSourceSignature = async (fiberRouter:string, token:string, feeDistributionData, chainId:number) => {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallets = await hre.zksyncEthers.getWallets()
    const wallet = wallets[1].connect(provider)

    const domain = {
        name: "FEE_DISTRIBUTOR",
        version: "000.001",
        chainId,
        verifyingContract: fiberRouter
    }

    const types = {
        DistributeFees: [
            { name: "token", type: "address"},
            { name: "referral", type: "address"},
            { name: "referralFee", type: "uint256"},
            { name: "referralDiscount", type: "uint256"},
            { name: "sourceAmountIn", type: "uint256"},
            { name: "sourceAmountOut", type: "uint256"},
            { name: "destinationAmountIn", type: "uint256"},
            { name: "destinationAmountOut", type: "uint256"},
            { name: "salt", type: "bytes32"},
            { name: "expiry", type: "uint256"}
        ]
    }

    const values = {
        token,
        referral: feeDistributionData.referral,
        referralFee: feeDistributionData.referralFee,
        referralDiscount: feeDistributionData.referralDiscount,
        sourceAmountIn: feeDistributionData.sourceAmountIn,
        sourceAmountOut: feeDistributionData.sourceAmountOut,
        destinationAmountIn: feeDistributionData.destinationAmountIn,
        destinationAmountOut: feeDistributionData.destinationAmountOut,
        salt: feeDistributionData.salt,
        expiry: feeDistributionData.expiry
    }
     
    return await wallet.signTypedData(domain, types, values)
}

export const getWithdrawSignature = async (fundManager:string, inputArgs, chainId:number) => {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallets = await hre.zksyncEthers.getWallets()
    const wallet = wallets[1].connect(provider)

    const domain = {
        name: "FUND_MANAGER",
        version: "000.004",
        chainId: chainId,
        verifyingContract: fundManager
    }

    const types = {
        WithdrawSigned: [
            { name: "token", type: "address" },
            { name: "payee", type: "address" },
            { name: "amount", type: "uint256" },
            { name: "salt", type: "bytes32" },
            { name: "expiry", type: "uint256" },
        ]
    }

    const values = {
        token: inputArgs.token,
        payee: inputArgs.payee,
        amount: inputArgs.amount,
        salt: inputArgs.salt,
        expiry: inputArgs.expiry,
    }
    
    return await wallet.signTypedData(domain, types, values)
}

export const sendTx = async (txResponse: Promise<ContractTransactionResponse>, successMessage?: string) => {
    const receipt = await (await txResponse).wait()
    try {
        if (receipt?.status == 1) {
            successMessage ? console.log(successMessage) : null
            console.log("Transaction hash: " + receipt.hash)
        } else {
            console.error("Transaction failed: " + receipt);
        }
    } catch (error) {
        console.error(error);
    }
}
