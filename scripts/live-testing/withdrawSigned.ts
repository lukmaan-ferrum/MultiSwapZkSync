import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";
import { ethers, hexlify, randomBytes } from "ethers"
import addresses from "../../constants/addresses.json"
import fiberRouterArtifact from "../../artifacts-zk/contracts/multiswap-contracts/MultiSwapForge.sol/MultiSwapForge.json"
import hre from "hardhat"
import { sendTx, getWithdrawSignature } from "./helpers";


const main = async () => {
    const thisNetwork = "zksync"
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallets = await hre.zksyncEthers.getWallets()
    const wallet = wallets[0].connect(provider)
    
    const fiberRouter = new ethers.Contract(
        addresses.networks[thisNetwork].deployments.multiSwapForge,
        fiberRouterArtifact.abi,
        wallet
    )
    const amount = 100000 // 10 cents

    const salt = hexlify(randomBytes(32))
    const expiry = Math.round((Date.now()/1000)) + 600

    const inputArgs = {
        token: addresses.networks[thisNetwork].foundry,
        payee: wallet.address,
        amount: amount,
        salt: salt,
        expiry: expiry
    }

    const signature = await getWithdrawSignature(
        addresses.networks[thisNetwork].deployments.fundManager,
        inputArgs,
        addresses.networks[thisNetwork].chainId,
    )

    await sendTx(fiberRouter.withdrawSignedForGasEstimation(
        addresses.networks[thisNetwork].foundry,
        wallet.address,
        amount,
        salt,
        expiry,
        signature,
        false
    ), "Withdraw successful")
}


main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
