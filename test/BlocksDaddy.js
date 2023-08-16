const { expect } = require("chai");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("BlocksDaddy", () => {
  let blocksDaddy;

  beforeEach(async () => {
    const BlocksDaddy = await ethers.getContractFactory("BlocksDaddy");
    blocksDaddy = await BlocksDaddy.deploy();
    // await blocksDaddy.wait;
  });

  it("Has a name", async () => {
    const result = await blocksDaddy.name();
    expect(result).to.be.equal("BlocksDaddy");
  });
});
