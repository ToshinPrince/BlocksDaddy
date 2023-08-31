// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("ethers");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const NAME = "BlocksDaddy";
  const SYMBOL = "BD";

  //setting up account
  const [deployer] = await hre.ethers.getSigners();

  //Deploing Contract
  const BlocksDaddy = await hre.ethers.getContractFactory("BlocksDaddy");
  const blocksDaddy = await BlocksDaddy.deploy(NAME, SYMBOL);
  await blocksDaddy.deployed();

  console.log(`Deploying BlocksDaddy Contract at: ${blocksDaddy.address}\n`);

  //listing 10 domain names
  const names = [
    "alice.eth",
    "bob.eth",
    "charlie.eth",
    "dave.eth",
    "eve.eth",
    "frank.eth",
    "grace.eth",
    "helen.eth",
    "irene.eth",
    "jack.eth",
  ];

  const costs = [
    tokens(1.2),
    tokens(7),
    tokens(2),
    tokens(1.5),
    tokens(1),
    tokens(2.5),
    tokens(1.8),
    tokens(3),
    tokens(8),
    tokens(1.4),
  ];

  for (var i = 0; i < 10; i++) {
    const transaction = await blocksDaddy
      .connect(deployer)
      .list(names[i], costs[i]);

    console.log(`Listed Domain Name ${i + 1}: ${names[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
