const { ethers, network, upgrades } = require("hardhat");

async function main() {
  const lotteryFactory = await ethers.getContractFactory("Lottery");
  console.log("Deploying contract to network :", network.name);

  const lotteryContract = await upgrades.deployProxy(
    lotteryFactory,[],
    { initializer: "initialize" }
  );

  await lotteryContract.waitForDeployment();
  const proxyAddress = await lotteryContract.getAddress();

  console.log("Lottery contract deployed to : ", proxyAddress);
}
main();