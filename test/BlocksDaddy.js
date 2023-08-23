const { expect } = require("chai");
const { ethers } = require("hardhat");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("BlocksDaddy", () => {
  let blocksDaddy;
  let deployer, owner1;

  const NAME = "BlocksDaddy";
  const SYMBOL = "BD";

  beforeEach(async () => {
    //setting Accounts
    [deployer, owner1] = await ethers.getSigners();

    //Deploploying Contract
    const BlocksDaddy = await ethers.getContractFactory("BlocksDaddy");
    blocksDaddy = await BlocksDaddy.deploy("BlocksDaddy", "BD");
    // await blocksDaddy.wait;

    //list domain
    const transaction = await blocksDaddy
      .connect(deployer)
      .list("john.blocks", tokens(10));
    await transaction.wait();
  });

  describe("deployment", () => {
    it("Has a name", async () => {
      const result = await blocksDaddy.name();
      expect(result).to.be.equal(NAME);
    });

    it("Has a Symbol", async () => {
      const result = await blocksDaddy.symbol();
      expect(result).to.be.equal(SYMBOL);
    });

    it("Deployer is owner", async () => {
      const result = await blocksDaddy.owner();
      expect(result).to.be.equal(deployer.address);
    });
    it("REturn Max Supply", async () => {
      const result = await blocksDaddy.maxSupply();
      expect(result).to.be.equal(1);
    });

    it("returns the Total Supply", async () => {
      const result = await blocksDaddy.totalSupply();
      expect(result).to.be.equal(0);
    });
  });

  describe("domain", () => {
    it("Return Domain Attributes", async () => {
      const domain = await blocksDaddy.getDomain(1);
      expect(domain.name).to.be.equal("john.blocks");
      expect(domain.cost).to.be.equal(tokens(10));
      expect(domain.isOwned).to.be.equal(false);
    });
  });

  describe("Minting", () => {
    const ID = 1;
    const AMOUNT = tokens(10);

    beforeEach(async () => {
      const transaction = await blocksDaddy
        .connect(owner1)
        .mint(ID, { value: AMOUNT });
      await transaction.wait();
    });

    it("Updates the Owner", async () => {
      const owner = await blocksDaddy.ownerOf(ID);
      expect(owner).to.be.equal(owner1.address);
    });

    it("updates the domain status", async () => {
      const domain = await blocksDaddy.getDomain(ID);
      expect(domain.isOwned).to.be.equal(true);
    });

    it("Updates the Balance", async () => {
      const balance = await blocksDaddy.getBalance();
      expect(balance).to.be.equal(AMOUNT);
    });
  });

  describe("Withdrawing", () => {
    const ID = 1;
    const AMOUNT = ethers.utils.parseUnits("10", "ether");

    let balanceBefore;

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      let transaction = await blocksDaddy
        .connect(owner1)
        .mint(ID, { value: AMOUNT });

      await transaction.wait();

      transaction = await blocksDaddy.withdraw();
      await transaction.wait();
    });

    it("Updates the owner balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("updates the Contract Balance", async () => {
      const result = await blocksDaddy.getBalance();
      expect(result).to.be.equal(0);
    });
  });
});
