const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy();

  await tracking.deployed();

  console.log(`Deployed to ${tracking.address} Address`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
