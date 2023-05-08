// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };
const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts", "It will show the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const address = await account.getAddress();
    const balance = await account.getBalance();
    console.log(`Address: ${address}, Balance: ${balance}`);
  }
});
module.exports = {
  solidity: "0.8.17",

  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/7c02737cf5f14c60899538534507f28c",
      accounts: [
        "e38f16732ae8363d931591061d2b36337c5778c45fa016aea283b2b632fdab0f",
      ],
    },
  },
};
