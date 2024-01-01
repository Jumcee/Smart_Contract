require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_KEY, PRIVATE_KEY } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: 'fuse',
  networks: {
    hardhat: {},
    fuse: {
      url: `https://rpc.fuse.io`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 122
    }
  }
};
