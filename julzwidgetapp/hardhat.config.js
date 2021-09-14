require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

module.exports = {
  solidity: "0.7.0",
  networks: {
   /* hardhat: {
      forking: {
        url: process.env.FORKING_URL,
        blockNumber: 12369635
      }
    },
    rinkeby: {
      url: process.env.RINKEBY_URL
    },*/
    ganache:{
      url: "HTTP://127.0.0.1:7545",
      accounts: ["2edb1022ad751e86680072aba80b52d093b03c692c064b762a51fbc27c1524d7"],
      chainId: 1337
    }
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/artifacts"
  }
};
