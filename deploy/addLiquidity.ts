import { HttpNetworkConfig, HardhatRuntimeEnvironment } from "hardhat/types";
import { Provider } from "zksync-ethers";
import { ContractTransactionResponse, ethers, parseEther, parseUnits } from "ethers"
import addresses from "../constants/addresses.json"
import hre from "hardhat"
import fundManagerArtifact from "../artifacts-zk/contracts/multiswap-contracts/FundManager.sol/FundManager.json"
import erc20abi from "./erc20Abi.json"


const deployScript = async function (hre: HardhatRuntimeEnvironment) {
    const thisNetwork = hre.network.name
    
    // Initiate contract instance
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallet = (await hre.zksyncEthers.getWallet()).connect(provider)

    const usdcAddress = "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4"
    const fundManagerAddress = "0x9524aA7870CE93b73AFc31a7D3Bf9808513Dd25f"
    const forgeFundManagerAddress = "0x053261b2670d4BD3401C2684c8be2826c8057C03"

    

    const usdc = new ethers.Contract(usdcAddress, erc20abi, wallet)
    const fundManager = new ethers.Contract(fundManagerAddress, fundManagerArtifact.abi, wallet)
    const forgeFundManager = new ethers.Contract(forgeFundManagerAddress, fundManagerArtifact.abi, wallet)

    const balance = await usdc.balanceOf(wallet.address)
    console.log("USDC Balance: " + await usdc.balanceOf(wallet.address))
    if (balance < parseUnits("5", 6)) {
        console.log("Insufficient USDC balance. Please top up your account with USDC")
        process.exit(1)
    }

    // Add liquidity
    // await sendTx(usdc.approve(fundManager, parseEther("1000000000")), "Approved USDC for FundManager")
    // await sendTx(fundManager.addLiquidity(usdc, parseUnits("4", 6)), "Added liquidity to FundManager")

    // // Add liquidity to forgeFundManager
    await sendTx(usdc.approve(forgeFundManager, parseEther("1000000000")), "Approved USDC for ForgeFundManager")
    await sendTx(forgeFundManager.addLiquidity(usdc, parseUnits("1", 6)), "Added liquidity to ForgeFundManager")
}

const sendTx = async (txResponse: Promise<ContractTransactionResponse>, successMessage?: string) => {
    const receipt = await (await txResponse).wait()
    await delay(100)
    if (receipt?.status == 1) {
        successMessage ? console.log(successMessage) : null
    } else {
        console.error("Transaction failed: " + receipt);
    }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export default deployScript;