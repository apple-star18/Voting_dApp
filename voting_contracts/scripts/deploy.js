// scripts/deploy.js – ethers v6 스타일
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  // ✅ ethers v6에서는 deployed() 대신 waitForDeployment()
  await voting.waitForDeployment();

  // ✅ ethers v6에서는 address 대신 getAddress()
  const addr = await voting.getAddress();
  console.log("Voting contract deployed to:", addr);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
