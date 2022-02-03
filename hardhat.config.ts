import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy-ethers";
import "hardhat-deploy";
import assert from "assert";

assert(process.env.NODE_URL);
assert(process.env.WALLET_PRIVATE_KEY);

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    online: {
      url: process.env.NODE_URL,
      accounts: [
        process.env.WALLET_PRIVATE_KEY,
      ]
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    tester1: {
      default: 1,
    },
    tester2: {
      default: 2,
    },
  },
  solidity: "0.8.0",
}

export default config;
