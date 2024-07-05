const hre = require("hardhat");

async function main() {
    const FraxTest = await hre.ethers.getContractFactory("FraxTest");
    const fraxTest = await FraxTest.deploy();
    await fraxTest.deployed();
    console.log("FraxTest deployed to:", fraxTest.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});