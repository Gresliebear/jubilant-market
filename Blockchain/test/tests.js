const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

let nineExp = 10n ** 9n;

describe("Setup", function () {
  // deployer is muiltsign wallet
  let deployer, act1, act2, act3;
  let AppManager,
    StakeManager,
    EmfContract,
    ERC20,
    AAVEPriceOracle,
    AAVELendingPoolAddressesProvider;
  let app, stake, emf, priceOracle, aaveAddressProvider, dai;

  beforeEach(async () => {
    console.log("Before");

    [deployer, act1, act2, act3] = await ethers.getSigners();

    // mocks

    ERC20 = await hre.ethers.getContractFactory("ERC20");
    dai = await ERC20.deploy();
    await dai.deployed();

    //mocks
    AAVEPriceOracle = await hre.ethers.getContractFactory("AAVEPriceOracle");
    priceOracle = await AAVEPriceOracle.deploy();
    await priceOracle.deployed();
    await priceOracle.setMockedPrice(dai.address, 290829374655191n);

    //mocks
    AAVELendingPoolAddressesProvider = await hre.ethers.getContractFactory(
      "AAVELendingPoolAddressesProvider"
    );
    aaveAddressProvider = await AAVELendingPoolAddressesProvider.deploy();
    await aaveAddressProvider.deployed();
    await aaveAddressProvider.setMockedPriceOracleAddress(priceOracle.address);

    //deploy contract after instance is made from Factory
    AppManager = await hre.ethers.getContractFactory("AppManager");
    app = await AppManager.deploy();
    app.deployed();

    StakeManager = await hre.ethers.getContractFactory("StakeManager");
    stake = await StakeManager.deploy(aaveAddressProvider.address, dai.address);
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
      let tx2 = await app.connect(act1).deposit({ value: 100_000n * nineExp });
    });

    it("It should be able to get the balance", async function () {
      let val = 100_000n * nineExp;
      let tx2 = await app.connect(act1).deposit({ value: 100_000n * nineExp });
      await tx2.wait();
      let bal = await app.connect(act1).balanceOf(act1.address);
      assert.equal(ethers.utils.formatEther(bal), "0.0001");
    });

    // call price View of Ethereum
    it("It should show us priceFeed of Eth from AAVE", async function () {
      let x = await stake.getPriceOfWei();
      console.log(x);
    });
  });
});
