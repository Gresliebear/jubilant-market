const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

let nineExp = 10n ** 9n;

describe("Setup", function () {
  // deployer is muiltsign wallet
  let deployer, act1, act2, act3;
  let AppManager, StakeManager, EmfContract;
  let app, stake, emf;

  beforeEach(async () => {
    console.log("Before");
    
    [deployer, act1, act2, act3] = await ethers.getSigners();
    
    //deploy contract after instance is made from Factory
    AppManager = await hre.ethers.getContractFactory("AppManager");
    app = await AppManager.deploy();
    app.deployed();
    
    StakeManager = await hre.ethers.getContractFactory("StakeManager");
    stake = await StakeManager.deploy();
    stake.deployed();

    EmfContract = await hre.ethers.getContractFactory("EMF");
    emf = await EmfContract.deploy();
    emf.deployed();

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

  // it("It should allow EMF to be set", async function () {
  //   await emf.setEmfContract(app.address);
  // });

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

    // // call price View of Ethereum
    it("It should show us priceFeed of Eth from Chainlink", async function () {
    // (node:50424) UnhandledPromiseRejectionWarning: Error: Transaction reverted: function call to a non-contract account
    // It means, the interface is trying to call a contract that doesn't exist.
    let price = await app.ViewPriceOfEth();
    price.then(function () {
          console.log("Promise Resolved");
    }).catch(function () {
          console.log("Promise Rejected");
    });
    });

  });
});
