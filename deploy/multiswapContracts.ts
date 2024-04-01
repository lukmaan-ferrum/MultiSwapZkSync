import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Provider } from "zksync-ethers";
import fs from 'fs';
import path from 'path';


const deployScript = async function (hre: HardhatRuntimeEnvironment) {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallet = (await hre.zksyncEthers.getWallet()).connect(provider)

    // Setup FerrumDeployer
    const rawData = fs.readFileSync(path.join(__dirname, 'deployedAddresses.json'), { encoding: 'utf8' });
    const deployedAddresses = JSON.parse(rawData);
    const ferrumDeployer = await hre.zksyncEthers.getContractAt("FerrumDeployer", deployedAddresses.FerrumDeployer, wallet)

    // Deploy contracts
    const salt = "0x3137303931363532303433393900000000000000000000000000000000000000";
    const contractNames = ["FiberRouter", "FundManager", "ForgeFundManager", "MultiSwapForge"];

    for (const contractName of contractNames) {
        const deployTx = await ferrumDeployer.deploy(salt, contractNames.indexOf(contractName), wallet.address)
        const receipt = await deployTx.wait()
        const contractAddress = receipt.contractAddress
        deployedAddresses[contractName] = contractAddress
        console.log(`${contractName} deployed at ${contractAddress}`)
    }

    // Save addresses to file
    fs.writeFileSync(path.join(__dirname, 'deployedAddresses.json'), JSON.stringify(deployedAddresses));
}


export default deployScript;
deployScript.tags = ["multiswapContracts", "prod"]
deployScript.dependencies = ["ferrumDeployer"]
