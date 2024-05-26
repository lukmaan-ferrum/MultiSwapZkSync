import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Provider, Contract } from "zksync-ethers";
import addresses from "../constants/addresses.json";
import * as fs from 'fs';
import path from 'path';
import fiberRouterArtifact from "../artifacts-zk/contracts/multiswap-contracts/FiberRouter.sol/FiberRouter.json"
import fundManagerArtifact from "../artifacts-zk/contracts/multiswap-contracts/FundManager.sol/FundManager.json"
import multiswapForgeArtifact from "../artifacts-zk/contracts/multiswap-contracts/MultiSwapForge.sol/MultiSwapForge.json"
import forgeFundManagerArtifact from "../artifacts-zk/contracts/multiswap-contracts/ForgeFundManager.sol/ForgeFundManager.json"
import { ethers } from "ethers";


const deployScript = async function (hre: HardhatRuntimeEnvironment) {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallet = (await hre.zksyncEthers.getWallet()).connect(provider)
    const thisNetwork = "zksync"

    const weth = addresses.networks.zksync.weth
    const foundry = addresses.networks.zksync.foundry
    const deployer = new Deployer(hre, wallet);
    console.log(deployer.ethWallet.address)

    // Deploy contracts
    // const fiberRouter = await (await deployContract(hre, "FiberRouter", deployer, [])).waitForDeployment();
    // console.log("FiberRouter: " + fiberRouter.target)
    // const fundManager = await (await deployContract(hre, "FundManager", deployer, [])).waitForDeployment();
    // console.log("FundManager: " + fundManager.target)
    // const multiswapForge = await (await deployContract(hre, "MultiSwapForge", deployer, [])).waitForDeployment();
    // console.log("MultiSwapForge: " + multiswapForge.target)
    // const forgeManager = await (await deployContract(hre, "ForgeFundManager", deployer, [])).waitForDeployment();
    // console.log("ForgeManager: " + forgeManager.target)

    // addresses.networks[thisNetwork].deployments.fiberRouter = fiberRouter.target as string
    // addresses.networks[thisNetwork].deployments.fundManager = fundManager.target as string
    // addresses.networks[thisNetwork].deployments.multiSwapForge = multiswapForge.target as string
    // addresses.networks[thisNetwork].deployments.forgeFundManager = forgeManager.target as string
    
    const fundManagerAddress = "0xe0595a09a154EF11d98C44a4A84D93bB9F46b74E"
    const fiberRouterAddress = "0x7C6454aEd2d0843b3C2A76822328C4AfECc99747"
    const multiswapForgeAddress = "0xBe43811355e5b2af45ad93b52Ab6fCeb9be5e616"
    const forgeFundManagerAddress = "0x053261b2670d4BD3401C2684c8be2826c8057C03"

    const fiberRouter = new ethers.Contract(fiberRouterAddress, fiberRouterArtifact.abi, deployer.ethWallet)
    const fundManager = new ethers.Contract(fundManagerAddress, fundManagerArtifact.abi, deployer.ethWallet)
    const multiswapForge = new ethers.Contract(multiswapForgeAddress, multiswapForgeArtifact.abi, deployer.ethWallet)
    const forgeManager = new ethers.Contract(forgeFundManagerAddress, forgeFundManagerArtifact.abi, deployer.ethWallet)

    const filePath = path.join(__dirname, '../constants/addresses.json');
    writeJsonToFile(filePath, addresses);

    // Post deploy configs
    console.log("\n##### FiberRouter configs #####")
    await sendTx(fiberRouter.setWeth(weth), "setWeth successful")
    await sendTx(fiberRouter.setFundManager(fundManager), "setFundManager successful")
    await sendTx(fiberRouter.addSigner(addresses.signer), "setSignerWallet successful")
    await sendTx(fiberRouter.setFeeWallet(addresses.feeWallet), "setFeeWallet successful")
    await sendTx(fiberRouter.setPlatformFee(addresses.platformFee), "setPlatformFee successful")
    await sendTx(fiberRouter.setGasWallet(addresses.gasWallet), "setGasWallet successful")
    
    console.log("\n##### FundManager configs #####")
    await sendTx(fundManager.setRouter(fiberRouter), "setRouter successful")
    await sendTx(fundManager.addFoundryAsset(foundry), "addFoundryAsset successful")
    await sendTx(fundManager.addSigner(addresses.signer), "setSignerWallet successful")
    await sendTx(fundManager.setLiquidityManagers(addresses.liquidityManager, addresses.liquidityManagerBot), "setLiquidityManagers successful")
    await sendTx(fundManager.setWithdrawalAddress(addresses.withdrawal), "setWithdrawalAddress successful")
    await sendTx(fundManager.setSettlementManager(addresses.settlementManager), "setSettlementManager successful")

    console.log("\n##### MultiSwapForge configs #####")
    await sendTx(multiswapForge.setWeth(weth), "setWeth successful")
    await sendTx(multiswapForge.setFundManager(forgeManager), "setPool successful")
    await sendTx(multiswapForge.setGasEstimationAddress(addresses.gasEstimationWallet), "setGasEstimationAddress successful")

    console.log("\n##### ForgeFundManager configs #####")
    await sendTx(forgeManager.setRouter(multiswapForge), "setRouter successful")
    await sendTx(forgeManager.addFoundryAsset(foundry), "addFoundryAsset successful")

    // Add routers and selectors. Selectors need to be computed with scripts/computeSelectors.ts and added to constants/addresses.json beforehand
    console.log("\n##### Adding routers and selectors #####")
    const swapRouters = addresses.networks[thisNetwork].routers
    for (const swapRouter of swapRouters) {
        console.log(`For router: ${swapRouter.router}`)
        const router = swapRouter.router
        const selectors = swapRouter.selectors
        await sendTx(fiberRouter.addRouterAndSelectors(router, selectors), "addRouterAndSelectors successful")
        await sendTx(multiswapForge.addRouterAndSelectors(router, selectors), "addRouterAndSelectors successful")
    }

    // Allow targets for other networks
    console.log("\n##### Allowing targets to other networks #####")
    let otherNetworks = Object.keys(addresses.networks).filter((network) =>
        network !== thisNetwork &&
        network !== "hardhat" &&
        network !== "localhost"
    );
    
    for (const otherNetwork of otherNetworks) {
        await sendTx(fundManager.allowTarget(
            foundry,
            addresses.networks[otherNetwork].chainId,
            addresses.networks[otherNetwork].foundry),
            `allowTarget to chainId ${addresses.networks[otherNetwork].chainId} successful`
        );
    }

    console.log("\n##### Contract Addresses #####")
    console.log("FiberRouter:\t\t", fiberRouter.target)
    console.log("FundManager:\t\t", fundManager.target)
    console.log("MultiSwapForge:\t\t", multiswapForge.target)
    console.log("ForgeFundManager:\t", forgeManager.target)
}

const deployContract = async function (hre: HardhatRuntimeEnvironment, contractName: string, deployer: Deployer , args: any[]): Promise<Contract> {
    const artifact = await deployer.loadArtifact(contractName);
    const contract = (await deployer.deploy(artifact, args, {
        gasLimit: 800000000,
    })).waitForDeployment();
    return contract
}

const sendTx = async (txResponse, successMessage?: string) => {
    const receipt = await (await txResponse).wait()
    if (receipt?.status == 1) {
        successMessage ? console.log(successMessage) : null
    } else {
        console.error("Transaction failed: " + receipt);
    }
}

const writeJsonToFile = (filePath: string, data: object) => {
    const dataStr = JSON.stringify(data, null, 4); // Converts JSON object to string with pretty print
    fs.writeFileSync(filePath, dataStr, 'utf8'); // Synchronously write file
}


export default deployScript;
