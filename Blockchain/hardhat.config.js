require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 * Implement muiltiple Solidity Compiler https://hardhat.org/guides/compile-contracts.html
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.7.6",
        settings: {},
      },
    ],
  },
};