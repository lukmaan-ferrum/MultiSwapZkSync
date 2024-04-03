import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { Provider, Wallet } from "zksync-ethers";
import { AbiCoder, Contract, encodeBytes32String, getBytes, id, keccak256, toBigInt } from "ethers";
import axios from 'axios';
import hre from "hardhat";
import fs from 'fs';
import path from 'path';
import * as dotenv from "dotenv";
import { MockERC20 } from "../../types";
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

    return {sig: signature.r + signature.s.slice(2) + sigV, digest: digest}
}


async function oneInchApi(
    src: string,
    dst: string,
    amount: string,
    from: string,
) {

    const chainId = 324

    const url = `https://api.1inch.dev/swap/v6.0/${chainId}/swap`;

    const config = {
        headers: {
            "Authorization": `Bearer ${process.env.ONE_INCH_API_KEY}`
        },
        params: {
            "src": src,
            "dst": dst,
            "amount": amount,
            "from": from,
            "slippage": "2",
            "includeProtocols": "true",
            "allowPartialFill": "true",
            "disableEstimate": "true"
        }
    };
      

    try {
        const response = await axios.get(url, config);
        return response
    } catch (error) {
        console.error(error);
    }
}

const getWhaleWallet = async (whaleWallet: string) => {
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [whaleWallet],
    });

    const whale = await hre.zksyncEthers.getImpersonatedSigner(whaleWallet)

    return whale
}


const main = async () => {
    const provider = new Provider((hre.network.config as HttpNetworkConfig).url)
    const wallets = await hre.zksyncEthers.getWallets()
    const wallet = wallets[0].connect(provider)
    const usdcWallet = wallets[1].connect(provider)

    const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'deploy','deployedAddresses.json'), { encoding: 'utf8' });
    const deployedAddresses = JSON.parse(rawData);
    const wethZkSync = "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91"
    const foundryZkSync = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"
    
    const fundManager = await hre.zksyncEthers.getContractAt("FundManager", deployedAddresses.FundManager, wallet)
    const fiberRouter = await hre.zksyncEthers.getContractAt("FiberRouterV2", deployedAddresses.FiberRouterV2, wallet)
    const zkSyncUSDC = await hre.zksyncEthers.getContractAt("MockERC20", foundryZkSync, wallet) as unknown as MockERC20
    const zkSyncWETH = await hre.zksyncEthers.getContractAt("MockERC20", wethZkSync, wallet) as unknown as MockERC20

    // await zkSyncUSDC.connect(usdcWallet).transfer(wallet.address, 5000000)
    // const liquidityAmount = await zkSyncUSDC.balanceOf(wallet.address)
    // await zkSyncUSDC.approve(fundManager.getAddress(), liquidityAmount);
    // await fundManager.addLiquidity(zkSyncUSDC.getAddress(), liquidityAmount);

    const liquidityAmount = 5000000

    console.log("Liquidity Amount: ", liquidityAmount.toString())
    
    await fundManager.addFoundryAsset(foundryZkSync)
    await fundManager.addSigner(await wallet.getAddress());


    // const ress = await hre.network.provider.request({
    //     method: "eth_blockNumber",
    //     params: [], // convert ms to seconds
    // });

    // console.log(ress)

    // const resss = await hre.network.provider.request({
    //     method: "eth_getBlockByNumber",
    //     params: [ress, false], // convert ms to seconds
    // });

    // console.log(resss)

    // await hre.network.provider.request({
    //     method: "evm_setNextBlockTimestamp",
    //     params: [(Math.round(Date.now() / 1000))], // convert ms to seconds
    // });

    const salt = encodeBytes32String("some other salt value");
    const expiry = Math.round(Date.now() / 1000) + 60 * 20; // 20 mins

    const abiCoder = AbiCoder.defaultAbiCoder()
    const sigHash = id("WithdrawSignedOneInch(address to,uint256 amountIn,uint256 amountOut,address foundryToken,address targetToken,bytes oneInchData,bytes32 salt,uint256 expiry)")
    
    const res = await oneInchApi(
        foundryZkSync,
        wethZkSync,
        liquidityAmount.toString(),
        wallet.address
    )

    console.log(res?.data)
    console.log(res?.status)

    // console.log(res?.data)
    
    // const amountOut = BigInt(res?.data.dstAmount) * BigInt(98) / BigInt(100)
    // const oneInchData = res?.data.tx.data

    // console.log("1inch Data: " + oneInchData)

    // const message = keccak256(
    //     abiCoder.encode(
    //         ["bytes32", "address", "uint256", "uint256", "address", "address", "bytes", "bytes32", "uint256"],
    //         [
    //             sigHash,
    //             wallet.address,
    //             liquidityAmount,
    //             amountOut,
    //             foundryZkSync,
    //             wethZkSync,
    //             oneInchData,
    //             salt,
    //             expiry
    //         ]
    //     )
    // )

    // const sig = await getSignature(fundManager, wallet, message);
        

    // console.log(await zkSyncWETH.balanceOf(wallet.address))

    // const tx = await fiberRouter.withdrawSignedAndSwapOneInch(
    //     wallet.address,
    //     liquidityAmount,
    //     amountOut,
    //     foundryZkSync,
    //     wethZkSync,
    //     oneInchData,
    //     salt,
    //     expiry,
    //     sig.sig
    // );

    // await tx.wait();

    // console.log(await zkSyncWETH.balanceOf(wallet.address))

    // console.log("OneInch Swap completed successfully!")
}


main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});




