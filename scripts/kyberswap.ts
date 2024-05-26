import axios from "axios";
import { ethers } from "ethers";

const erc20Abi = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const provider = new ethers.JsonRpcProvider('https://scroll-mainnet.chainstacklabs.com')
    const ferrumWallet = new ethers.Wallet(process.env.FERRUM_PRIVATE_KEY!, provider)
    const wallet1 = new ethers.Wallet(process.env.WALLET1_PRIVATE_KEY!, provider)
    const wallet2 = new ethers.Wallet(process.env.WALLET2_PRIVATE_KEY!, provider)
    const wallet = wallet2 // signing wallet

    const sender = wallet2.address
    const recipient = ferrumWallet.address

    const fromToken = '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4'
    const toToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    const amount = 5000000
    const decimals = 6
    const amountIn = (BigInt(amount) * BigInt(1 * 10 ** decimals)).toString()

    const targetPathConfig = {
        params: {
            tokenIn: fromToken,
            tokenOut: toToken,
            amountIn
        }
    };

    console.log(`\nCalling Get Swap Route...`)
    let {data} = await axios.get(
        `https://aggregator-api.kyberswap.com/scroll/api/v1/routes`,
        targetPathConfig
    )

    console.log(data.data.routeSummary.route)

    const requestBody = {
        routeSummary: data.data.routeSummary,
        sender,
        recipient,
        slippageTolerance: 200 // in bps, 200 = 2%
    }
        
    console.log(`\nCalling Build Swap Route...`)
    data = await axios.post(
        `https://aggregator-api.kyberswap.com/scroll/api/v1/route/build`,
        requestBody
    );
    console.log(data.data)
    
    // const kyberswapRouter = `0x6131B5fae19EA4f9D964eAc0408E4408b66337b5`
    // const erc20Contract = new ethers.Contract(fromToken, erc20Abi, wallet)
    // const approvalTx = await erc20Contract.approve(kyberswapRouter, amountIn)
    
    // console.log(`Approving ${amountIn} ${fromToken}...`)
    // await approvalTx.wait();
    // console.log(`Approved`)

    // const calldata = data.data.data.data;

    // const txObj = {
    //     to: kyberswapRouter,
    //     data: calldata,
    //     gasLimit: 1000000, // seems to sometimes fail when using their suggested gas. No harm in passing a high gas limit
    // };

    // const tx = await wallet.sendTransaction(txObj);
    // console.log('Transaction sent:', tx.hash);

    // const receipt = await tx.wait();
    // console.log(receipt)
};


main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});



