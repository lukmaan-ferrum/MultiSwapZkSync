import { HttpNetworkConfig } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";
import hre from "hardhat";

async function main() {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallets = await hre.zksyncEthers.getWallets()
    const wallet = wallets[0].connect(provider)
    console.log(wallet)

    // // Get the balance of the specified address
    const balance = await provider.getBalance(wallet.address);
    
    console.log(`Balance of ${wallet.address}: ${balance.toString()}`);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
