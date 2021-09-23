const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

let nineExp = 10n ** 9n;

describe("Setup", function () {
  let deployer, act1, act2, act3;
  let AppManager, StakeManager;
  let app, stake;
  beforeEach(async () => {
    console.log("Before");
    [deployer, act1, act2, act3] = await ethers.getSigners();
    AppManager = await hre.ethers.getContractFactory("AppManager");
    app = await AppManager.deploy();
    app.deployed();
    StakeManager = await hre.ethers.getContractFactory("StakeManager");
    stake = await StakeManager.deploy();
    stake.deployed();
  });

  it("It should not allow deposit before staker is set", async function () {
    let val = 100_000n * nineExp;
    await expect(app.connect(act1).deposit({ value: val })).to.be.revertedWith(
      "StakeManager not ready"
    );
  });
  it("It should allow stake manager to be set", async function () {
    await app.setStakeManager(stake.address);
  });

  it("It should allow app manager to be set", async function () {
    await stake.setAppManager(app.address);
  });

  describe("Main", function () {
    beforeEach(async () => {
      let tx = await app.setStakeManager(stake.address);
      await tx.wait();
      let tx2 = await stake.setAppManager(app.address);
      await tx2.wait();
    });

    it("It should allow stake manager to be depositable", async function () {
      let val = 100_000n * nineExp;
      let tx2 = app.connect(act1).deposit({ value: 100_000n * nineExp });
    });
  });
});
