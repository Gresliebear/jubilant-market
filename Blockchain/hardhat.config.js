require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// npx hardhar accounts // call to addresses?
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

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
      // AAVE 
      {
        version: "0.6.12",
        settings: {},
      },
    ],
  },
};