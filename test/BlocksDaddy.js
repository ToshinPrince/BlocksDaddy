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
  });
});
