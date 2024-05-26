import { ethers } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()


const networks = [
    {
        name: 'Ethereum',
        rpcUrl: 'https://eth.llamarpc.com',
        fundManagerAddress: '0x5eBeF0bD015e4fAfe64172Ae00b9bB46a05906a7',
        foundryToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
    {
        name: 'BSC',
        rpcUrl: 'https://bsc.drpc.org',
        fundManagerAddress: '0x5eBeF0bD015e4fAfe64172Ae00b9bB46a05906a7',
        foundryToken: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    },
    {
        name: 'Arbitrum',
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        fundManagerAddress: '0x5eBeF0bD015e4fAfe64172Ae00b9bB46a05906a7',
        foundryToken: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    },
    {
        name: 'Optimism',
        rpcUrl: 'https://mainnet.optimism.io',
        fundManagerAddress: '0xfbae4Ba5eD36e480A7176116A9B3aba5DfDc0Ecb',
        foundryToken: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    },
    {
        name: 'Avalanche',
        rpcUrl: 'https://avax.meowrpc.com',
        fundManagerAddress: '0x5eBeF0bD015e4fAfe64172Ae00b9bB46a05906a7',
        foundryToken: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    },
];
const fundManagerAbi = [
    'function allowTarget(address token, uint256 chainId, address targetToken)',
]

async function main() {
    const baseFoundryToken = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
    const baseChainId = 8453

    for (const network of networks) {
        try {
            const provider = new ethers.JsonRpcProvider(network.rpcUrl);
            const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!, provider);
            const fundManager = new ethers.Contract(network.fundManagerAddress, fundManagerAbi, wallet)
        
            const tx = await fundManager.allowTarget(network.foundryToken, baseChainId, baseFoundryToken)
            console.log(`Allowing target for ${network.name}...`)
            await tx.wait();
            console.log(`Target allowed for ${network.name}`)
        } catch (error: any) {
            console.log(`Error allowing target for ${network.name}:`, error.reason)
        }
    }
}


main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
