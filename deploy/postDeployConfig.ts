import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Provider } from "zksync-ethers";
import fs from 'fs';
import path from 'path';
import { ContractTransactionResponse } from "ethers";

// These addresses should go in a config file somewhere
const oneInchAggregatorRouter = "0x6fd4383cB451173D5f9304F041C7BCBf27d561fF" // AggregationRouterV6
const signerAddress = "0x0aee4E03645bB13b49Bb4e5784f7efB8Ee332073"
const liquidityManager = "0x5dAC22dB4dEaCfab7e9A0A1425f25D6B18e9839C"
const liquidityManagerBot = "0x9B7C800DCca6273CB6DDb861764cFB95BDAb15cc"
const withdrawalAddress = "0x1370172Ed69Ec231cDB8E59d928D42824094c0C6"
const settlementManagerAddress = "0x5912cE9327C2F8BE2Ffce1e8E521F6a65A870a19"
const gasWallet = "0xBFBFE0e25835625efa98161e3286Ca1290057E1a"
const gasEstimationAddress = "0x896aa74980f510e17Ec22A9906b6ce82Ef84C49F"

const wethZkSync = "0xf00DAD97284D0c6F06dc4Db3c32454D4292c6813"
const foundryZkSync = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"

const chainData: { [key: string]: { foundry: string; chainID: number } } = {
    Arbitrum: { foundry: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", chainID: 42161 },
    Binance: { foundry: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", chainID: 56 },
    Ethereum: { foundry: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chainID: 1 },
    Optimism: { foundry: "0x0b2c639c533813f4aa9d7837caf62653d097ff85", chainID: 10 },
    Avalanche: { foundry: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", chainID: 43114 },
    Base: { foundry: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", chainID: 8453 },
    Scroll: { foundry: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4", chainID: 534352 },
};

const deployScript = async function (hre: HardhatRuntimeEnvironment) {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallet = (await hre.zksyncEthers.getWallet()).connect(provider)

    // Setup FerrumDeployer
    const rawData = fs.readFileSync(path.join(__dirname, 'deployedAddresses.json'), { encoding: 'utf8' });
    const deployedAddresses = JSON.parse(rawData);

    const fiberRouter = await hre.zksyncEthers.getContractAt("FiberRouter", deployedAddresses.FiberRouter, wallet)
    const fundManager = await hre.zksyncEthers.getContractAt("FundManager", deployedAddresses.FundManager, wallet)
    const forgeFundManager = await hre.zksyncEthers.getContractAt("ForgeFundManager", deployedAddresses.ForgeFundManager, wallet)
    const multiSwapForge = await hre.zksyncEthers.getContractAt("MultiSwapForge", deployedAddresses.MultiSwapForge, wallet)

    await sendTx(fiberRouter.setWETH(wethZkSync), "WETH address added successfully in FiberRouter!")
    await sendTx(multiSwapForge.setWETH(wethZkSync), "WETH address added successfully in MultiSwapForge!")
    await sendTx(fiberRouter.setPool(fundManager.getAddress()), "Pool Fund Manager address added successfully in FiberRouter!")
    await sendTx(multiSwapForge.setPool(forgeFundManager.getAddress()), "Pool Forge Manager address added successfully in MultiSwap Forge!")
    await sendTx(fiberRouter.setOneInchAggregatorRouter(oneInchAggregatorRouter), "OneInch Aggregator address added successfully in FiberRouter!")
    await sendTx(multiSwapForge.setOneInchAggregatorRouter(oneInchAggregatorRouter), "OneInch Aggregator address added successfully in MultiSwap Forge!")
    await sendTx(fundManager.setRouter(fiberRouter.getAddress()), "Router added successfully in FundManager!")
    await sendTx(forgeFundManager.setRouter(multiSwapForge.getAddress()), "Forge added successfully in ForgeManager!")
    await sendTx(fundManager.addSigner(signerAddress), "Signer address added to FundManager!")
    await sendTx(fundManager.addFoundryAsset(foundryZkSync), "USDC Foundry asset added to FundManager!")
    await sendTx(forgeFundManager.addFoundryAsset(foundryZkSync), "USDC Foundry asset added to ForgeFundManager!")
    await sendTx(fiberRouter.setGasWallet(gasWallet), "Gas wallet succesfully added to FiberRouter!")
    await sendTx(multiSwapForge.setGasEstimationAddress(gasEstimationAddress), "Gas Estimation Address added successfully in MultiSwapForge!")
    await sendTx(fundManager.setLiquidityManagers(liquidityManager, liquidityManagerBot), "Liquidity Managers added successfully in FundManager!")
    await sendTx(fundManager.setWithdrawalAddress(withdrawalAddress), "Liquidity Withdrawal Address added successfully in FundManager!")
    await sendTx(fundManager.setSettlementManager(settlementManagerAddress),"Settlement Manager address added successfully in FundManager!")

    for (const [chainName, { foundry, chainID }] of Object.entries(chainData)) {
        await sendTx(
            fundManager.allowTarget(foundryZkSync, chainID, foundry),
            `${chainName} targer succesfully added to FundManager!`
        )
    }
}

const sendTx = async (txResponse: Promise<ContractTransactionResponse>, successMessage: string) => {
    const receipt = await (await txResponse).wait()
    if (receipt?.status == 1) {
        console.log(successMessage);
    } else {
        console.error("Transaction failed: " + receipt);
    }
}

export default deployScript;
deployScript.tags = ["postDeployConfig", "prod"]
deployScript.dependencies = ["multiswapContracts"]
