import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { Provider, utils } from "zksync-ethers";
import fs from 'fs';
import path from 'path';


const deployScript = async function (hre: HardhatRuntimeEnvironment) {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallet = (await hre.zksyncEthers.getWallet()).connect(provider)
    const deployer = new Deployer(hre, wallet);
    const ferrumDeployerArtifact = await deployer.loadArtifact("FerrumDeployer")

    // Contracts to deploy bytecodes and bytecode hashes
    const contractNames = ["FiberRouterV2", "FundManager", "ForgeFundManager", "MultiSwapForge"];
    const bytecodes = [];
    const bytecodeHashes = [];

    for (const contract of contractNames) {
        const artifact = await deployer.loadArtifact(contract);
        const hash = utils.hashBytecode(artifact.bytecode);
        bytecodes.push(artifact.bytecode);
        bytecodeHashes.push(hash);
    }

    // Send dummy tx to register factory deps with Operator. Factory deps need to be split as
    // there isn't enough space in a single transaction for bytecodes of all 4 contracts
    const tx = await wallet.sendTransaction({
        to: wallet.address,
        value: 0,
        customData: {
            factoryDeps: bytecodes.slice(0,2)
        }
    });
    await tx.wait()

    // Deploy
    const deployArgs = bytecodeHashes.map((hash, index) => [index, hash]);
    const deployTx = await deployer.deploy(
        ferrumDeployerArtifact,
        [deployArgs],
        undefined,
        bytecodes.slice(2) // Pass in remaining bytecodes to factoryDeps
    );
    const ferrumDeployer = await deployTx.waitForDeployment();
    
    // Save address to file
    const addr = await ferrumDeployer.getAddress()
    const data = JSON.stringify({ FerrumDeployer: addr });
    fs.writeFileSync(path.join(__dirname, 'deployedAddresses.json'), data);
    console.log(`\nFerrumDeployer deployed at ${await ferrumDeployer.getAddress()}`);
}


export default deployScript;
deployScript.tags = ["ferrumDeployer", "prod", "test"]
