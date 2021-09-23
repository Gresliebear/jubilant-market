const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");
const { network } = require("hardhat");

const CONTRACTS_DIR = __dirname + "/../../PythonServer/public/contracts";

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
    // why is this autoimported?
    process.exit(1);
  }

  // in dev environment, first hardhat account
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account (owner):",
    await deployer.getAddress()
  );

  console.log(
    "Owner Account balance:",
    (await deployer.getBalance()).toString()
  );
  const AppManager = await hre.ethers.getContractFactory("AppManager");

  const app = await AppManager.deploy();
  await app.deployed();
  console.log("AppManager deployed to:", app.address);

  const StakeManager = await hre.ethers.getContractFactory("StakeManager");
  const stake = await StakeManager.deploy();
  await stake.deployed();
  console.log("StakeManager deployed to:", app.address);

  let tx = await app.setStakeManager(stake.address);
  await tx.wait();
  console.log("StakeManager set on AppManager");
  let tx2 = await stake.setAppManager(app.address);
  await tx2.wait();
  console.log("AppManager set on StakeManager");
  saveLocalFiles(app, stake, deployer);
}

function saveLocalFiles(app, stake, owner) {
  if (!fs.existsSync(CONTRACTS_DIR)) {
    fs.mkdirSync(CONTRACTS_DIR);
  }

  fs.writeFileSync(
    CONTRACTS_DIR + "/contracts.json",
    JSON.stringify(
      {
        OwnerAddress: owner.address,
        AppManager: app.address,
        StakeManager: stake.address,
      },
      undefined,
      2
    )
  );

  saveArtifact("AppManager");
  saveArtifact("StakeManager");
}

function saveArtifact(name) {
  const artifacts = hre.artifacts.readArtifactSync(name);
  fs.writeFileSync(
    CONTRACTS_DIR + "/" + name + ".json",
    JSON.stringify(artifacts, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
