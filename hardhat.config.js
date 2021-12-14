require("@nomiclabs/hardhat-waffle");

const PROJECT_ID = "AY-WZ1IXvUc5DoSHQWBb-fSv68H2PwsQ";
const WALLET_PRIVATE_KEY =
  "500a743f70f9cf7251d91fbcf35bb4abb9a016e016fac57877f330c76ecd2ee5";

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
