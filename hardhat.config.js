require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    local: {
      chainId: 31337,
      url: "http://127.0.0.1:8545", //Your RPC URL
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"], //Your private key
    },
    polygon: {
      chainId: 80001,
      url: "https://polygon-mumbai.g.alchemy.com/v2/zy0YskI1Q19N6MsIo4KWq2goniaYKTix",
      accounts: [""], //private key
    },
    goerli: {
      chainId: 05,
      url: "https://eth-goerli.g.alchemy.com/v2/welDuFTBZcdINPCirTOy4UgeEfOPmsRp",
      accounts: [""], //private key
    }
  }
};
