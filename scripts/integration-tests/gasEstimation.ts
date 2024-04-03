import { HttpNetworkConfig } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";
import { AbiCoder, Contract, encodeBytes32String, id, keccak256 } from "ethers";
import hre from "hardhat";
import fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config();


const getSignature = async (
    domainAddress: Contract,
    signer: Wallet,
    message: string
) => {
    const abiCoder = AbiCoder.defaultAbiCoder()
    
    // Domain Separator
    const nameHash = id("FUND_MANAGER")
    const versionHash = id("000.004")
    const typeHash = id("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
    const addr = await domainAddress.getAddress()
    const chainId = await hre.network.provider.request({
        method: "eth_chainId",
        params: [],
    }) as string;
    const domainSeparator  = keccak256(abiCoder.encode(
        ["bytes32", "bytes32", "bytes32", "uint256", "address"],
        [typeHash, nameHash, versionHash, chainId, addr]
    ))

    // Concat with struct hash and hash result (as in EIP712)
    const digest = keccak256("0x1901" + domainSeparator.slice(2) + message.slice(2))

    // Sign
    const signature = signer.signingKey.sign(digest)
    const sigV = signature.v === 27 ? "1b" : "1c" // ethers signing should only generate 27 or 28 for 'v'

    return signature.r + signature.s.slice(2) + sigV
}

const main = async () => {
    const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'deploy','deployedAddresses.json'), { encoding: 'utf8' });
    const deployedAddresses = JSON.parse(rawData);
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallet = (await hre.zksyncEthers.getWallet()).connect(provider)
    
    const mockToken = await hre.deployer.deploy("MockERC20");
    await mockToken.waitForDeployment();

    const forgeFundManager = await hre.zksyncEthers.getContractAt("ForgeFundManager", deployedAddresses.ForgeFundManager, wallet)
    const multiSwapForge = await hre.zksyncEthers.getContractAt("MultiSwapForge", deployedAddresses.MultiSwapForge, wallet)

    const liquidityAmount = 1000000;
    await forgeFundManager.addFoundryAsset(mockToken.getAddress());
    await mockToken.approve(forgeFundManager.getAddress(), liquidityAmount);
    await forgeFundManager.addLiquidity(mockToken.getAddress(), liquidityAmount);
    await multiSwapForge.setGasEstimationAddress(wallet.address)
    await forgeFundManager.addSigner(await wallet.getAddress());

    await hre.network.provider.request({
        method: "evm_setNextBlockTimestamp",
        params: [Date.now()],
    });

    const salt = encodeBytes32String("some salt value");
    const expiry = Date.now() + 1000;

    const abiCoder = AbiCoder.defaultAbiCoder()
    const sigHash = id("WithdrawSigned(address token,address payee,uint256 amount,bytes32 salt,uint256 expiry)")
    const message = keccak256(
        abiCoder.encode(
            ["bytes32", "address", "address", "uint256", "bytes32", "uint256"],
            [
                sigHash,
                await mockToken.getAddress(),
                await forgeFundManager.getAddress(),
                liquidityAmount,
                salt,
                expiry
            ]
        )
    )
    
    const signature = await getSignature(forgeFundManager, wallet, message);
    
    const estimatedGas = await multiSwapForge.withdrawSignedForGasEstimation.estimateGas(
        mockToken.getAddress(),
        forgeFundManager.getAddress(),
        liquidityAmount,
        salt,
        expiry,
        signature
    );

    console.log(estimatedGas.toString() + " gas units")
}


main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
