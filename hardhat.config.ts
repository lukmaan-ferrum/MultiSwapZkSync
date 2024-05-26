import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync-node";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-ethers";
import '@typechain/hardhat'
import dotenv from "dotenv";
dotenv.config();


const config: HardhatUserConfig = {
  defaultNetwork: "inMemoryNode",
  networks: {
    zkSyncSepoliaTestnet: {
      url: "https://sepolia.era.zksync.dev",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL: "https://explorer.sepolia.era.zksync.dev/contract_verification",
      accounts: [process.env.PRIVATE_KEY0!]
    },
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io",
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL: "https://api-era.zksync.network/api",
      accounts: [process.env.SALMAN_KEY!, process.env.PRIVATE_GAS_ESTIMATION!]
    },
    dockerizedNode: {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      zksync: true,
    },
    inMemoryNode: {
      url: "http://127.0.0.1:8011",
      ethNetwork: "localhost", // in-memory node doesn't support eth node; removing this line will cause an error
      zksync: true,
      accounts: [process.env.SALMAN_KEY!, process.env.PRIVATE_GAS_ESTIMATION!]
    },
    hardhat: {
      zksync: true,
    },
  },
  zksolc: {
    version: "1.4.0",
    settings: {
      isSystem: true,
      optimizer: {
        enabled: true, // optional. True by default
        mode: '3', // optional. 3 by default, z to optimize bytecode size
        fallback_to_optimizing_for_size: true, // optional. Try to recompile with optimizer mode "z" if the bytecode is too large
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
    ],
  },
  etherscan: {
    customChains: [
      {
        network: "zkCustom",
        chainId: 324,
        urls: {
          apiURL: "https://api-era.zksync.network/api",
          browserURL: "https://era.zksync.network/"
        }
      }
    ]
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
