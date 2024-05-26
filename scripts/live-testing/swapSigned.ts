import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";
import { ethers, hexlify, randomBytes } from "ethers"
import addresses from "../../constants/addresses.json"
import fiberRouterArtifact from "../../artifacts-zk/contracts/multiswap-contracts/FiberRouter.sol/FiberRouter.json"
import usdcAbi from "../abis/Usdc.json"
import hre from "hardhat"
import { id } from "ethers";
import { sendTx, getSourceSignature } from "./helpers";


const main = async () => {
    const thisNetwork = "zksync"
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallets = await hre.zksyncEthers.getWallets()
    const wallet = wallets[0].connect(provider)
    const foundry = new ethers.Contract(
        addresses.networks[thisNetwork].foundry,
        usdcAbi,
        wallet
    )
    const fiberRouter = new ethers.Contract(
        addresses.networks[thisNetwork].deployments.fiberRouter,
        fiberRouterArtifact.abi,
        wallet
    )
    const amountIn = 600000 // 10 cents
    await sendTx(foundry.approve(fiberRouter, BigInt(amountIn)), "Approve successful")

    console.log("Balance: " + await foundry.balanceOf(wallet.address))

    const salt = hexlify(randomBytes(32))
    const expiry = Math.round((Date.now()/1000)) + 600
    
    const referral = "0xeb608fe026a4f54df43e57a881d2e8395652c58d"
    const referralFee = 0 // 50%
    const referralDiscount = 0 // 20%
    const amountOut = amountIn * 0.99  +  amountIn * 0.01 * (100 - referralFee) / 100 // 1% fee, but give back 0.2% again
    const feeDistributionData = {
        referral,
        referralFee,
        referralDiscount,
        sourceAmountIn: amountIn,
        sourceAmountOut: amountOut,
        destinationAmountIn: amountOut,
        destinationAmountOut: 20000, // Can be anything
        salt,
        expiry,
    };

    const signature = await getSourceSignature(fiberRouter.target as string, foundry.target as string, feeDistributionData, addresses.networks[thisNetwork].chainId)

    await sendTx(fiberRouter.swapSigned(
        foundry,
        amountIn,
        {
            targetNetwork: 8453,
            targetToken: addresses.networks.base.foundry,
            targetAddress: wallet.address
        },
        id("some withdrawal data"),
        false,
        {
            ...feeDistributionData,
            signature
        },
        { value: 100}
    ), "Swap successful")
}


main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
