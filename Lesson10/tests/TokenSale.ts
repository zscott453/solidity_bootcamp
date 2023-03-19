import { expect } from "chai";
import { ethers } from "hardhat";
import {
  MyToken,
  MyToken__factory,
  TokenSale,
  TokenSale__factory,
} from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

const TEST_TOKEN_RATIO = 1;
const TEST_TOKEN_MINT = 1;

describe("NFT Shop", async () => {
  let tokenSaleContract: TokenSale;
  let tokenContract: MyToken;
  let deployer: SignerWithAddress;
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;

  beforeEach(async () => {
    [deployer, account1, account2] = await ethers.getSigners();


  const tokenSaleContractFactory = new TokenSale__factory(deployer);
  tokenContract = await tokenSaleContractFactory.deploy(
    TEST_TOKEN_RATIO,
    ethers.constants.AddressZero
  );
  await tokenSaleContract.deployTransaction.wait();
  

  const giveTokenMintRoleTx = await tokenContract.grantRole(
    "address",
    tokenSaleContract.address
  );
  });

  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
      const ratio = await tokenSaleContract.ratio();
      expect(ratio).to.eq(TEST_TOKEN_RATIO);
    });

    it("uses a valid ERC20 as payment token", async () => {
      const tokenAddress = await tokenSaleContract.tokenAddress();
      const tokenContractFactory = new MyToken__factory(deployer);
      const tokenUsedInContract = tokenContractFactory.attach(tokenAddress);
      await expect(tokenUsedInContract.totalSupply()).to.not.be.reverted;
      await expect(tokenUsedInContract.balanceOf(account1.address)).to.not.be
      .reverted;
      await expect(
        tokenUsedInContract.transfer(account1.address, 1)
        ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });
  });

  describe("When a user purchase an ERC20 from the Token contract", async () => {
    let tokenBalanceBeforeMint: BigNumber;
    beforeEach(async () => {
      tokenBalanceBeforeMint = await tokenContract.balanceOf(account1.address);
      const buyTokensTx = await tokenSaleContract.connect(account1).buyTokens;
      await buyTokensTx.wait();
    });

    it("charges the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns an ERC20 at the Shop contract", async () => {
    it("gives the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("burns the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user purchase a NFT from the Shop contract", async () => {
    it("charges the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct nft", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner pool account correctly", async () => {
      throw new Error("Not implemented");
    });

    it("update the public pool account correctly", async () => {
      throw new Error("Not implemented");
    });

    it("favors the public pool with the rounding", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
    it("updates the public pool correctly", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner withdraw from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner pool account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});