import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const mnemonic = process.env.SEED_PHRASE || "test test test test test test test test test test test junk";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic,
        count: 10,
        path: "m/44'/60'/0'/0",
        initialIndex: 0
      },
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic,
        count: 10,
        path: "m/44'/60'/0'/0",
        initialIndex: 0
      },
    },
    polygon: {
      chainId: 137,
      url: "https://polygon-bor-rpc.publicnode.com",
      accounts: {
        mnemonic,
        count: 10,
        path: "m/44'/60'/0'/0",
        initialIndex: 0
      },
    },
  },
};

export default config;
