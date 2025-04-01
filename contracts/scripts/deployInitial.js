const { ethers, network, upgrades } = require("hardhat");

async function main() {
  const lotteryFactory = await ethers.getContractFactory("NextLotteryV1");
  console.log("Deploying contract to network :", network.name);
  console.log(process.env.SUBSCRIPTION_ID,process.env.KEY_HASH,process.env.VRF_COORDINATOR)
  const subscription_id = process.env.SUBSCRIPTION_ID;
  const keyHash = process.env.KEY_HASH;
  const vrfCoordinator = process.env.VRF_COORDINATOR;
  const callbackGasLimit = 1000000;
  const requestConfirmations = 3;
  const numWords = 1;
  const lotteryContract = await upgrades.deployProxy(
    lotteryFactory,
    [
      vrfCoordinator,
      subscription_id,
      keyHash,
      callbackGasLimit,
      requestConfirmations,
      numWords,
    ],
    {
      initializer: "initialize",
    }
  );

  await lotteryContract.waitForDeployment();
  const proxyAddress = await lotteryContract.getAddress();

  console.log("Lottery contract deployed to : ", proxyAddress);
}
main();
