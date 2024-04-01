const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("upgrade", "Upgrade contract").setAction(async () => {
  const upgrade = require("./scripts/upgrade");
  await upgrade();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "boba",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    boba: {
      chainId: 288,
      url: "https://mainnet.boba.network",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    },
  },
  etherscan: {
    apiKey: {
      boba: process.env.BOBA_API_KEY,
    },
    customChains: [
      {
        network: "boba",
        chainId: 288,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/288/etherscan",
          browserURL: "https://bobascan.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
