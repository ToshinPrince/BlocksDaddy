const { expect } = require("chai");
const { ethers } = require("hardhat");

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
  });

  describe("domain", () => {
    it("Return Domain Attributes", async () => {
      const domain = await blocksDaddy.getDomain(1);
      expect(domain.name).to.be.equal("john.blocks");
      expect(domain.cost).to.be.equal(tokens(10));
      expect(domain.isOwned).to.be.equal(false);
    });
  });
});
