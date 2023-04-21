require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const PROJECT_ID = process.env.PROJECT_ID;
const WALLET_PRIVATE_KEY = process.env.PROJECT_ID;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [WALLET_PRIVATE_KEY],
    },
    mainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
  solidity: "0.8.4",
};
