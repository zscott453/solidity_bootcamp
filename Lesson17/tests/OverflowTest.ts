import { ethers } from "ethers";

const SAFE_INCREMENT = 99;
const UNSAFE_INCREMENT = 199;

if (SAFE_INCREMENT + UNSAFE_INCREMENT <= 2 ** 8)
  throw new Error("Test not properly configured");

describe("Testing Overflow operations", async () => {
  let testContract: OverflowTest;

  beforeEach(async () => {
    const testContractFactory = await ethers.getContractFactory("OverflowTest");
    testContract = await testContractFactory.deploy();
    await testContract.deployed();
    const tx = await testContract.increment(SAFE_INCREMENT);
    await tx.wait();
  });

  describe("When incrementing under safe circumstances", async () => {
    it("increments correctly", async () => {
      // TODO
    });
  });
  describe("When incrementing to overflow", async () => {
    it("reverts", async () => {
      // TODO
    });
  });
  describe("When incrementing to overflow within a unchecked block", async () => {
    it("overflows and increments", async () => {
        const tx = await testContract.forceIncrement(SAFE_INCREMENT);
        await tx.wait();
        const counter = await testContract.counter();
        expect(counter).to.eq(42);
    });
  });
});