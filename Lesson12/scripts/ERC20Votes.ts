import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {
    const [deployer, account1, account2] = await ethers.getSigners();
    // Deploy contract
    const contractFactory = new MyToken__factory(deployer);
    const contract: MyToken = await contractFactory.deploy();
    const deployTransactionReceipt = await contract.deployTransaction.wait();
    console.log(
        `The tokenized Votes Contract was deployed at the block ${deployTransactionReceipt.blockNumber}`
    )

    // Mint some tokens
    const mintTx = await contract.mint(account1.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    console.log(
        `Tokens minted for ${account1.address} at the block ${mintTxReceipt.blockNumber}`
    );
    const tokenBalanceAccount1 = await contract.balanceOf(account1.address);
    console.log(
        `Account 1 has a balance of ${ethers.utils.formatUnits(
            tokenBalanceAccount1
        )} Vote Tokens`
    );


    // Check the voting power
    let votePowerAccount1 = await contract.getVotes(account1.address);
    console.log(
        `Account 1 has vote power of ${ethers.utils.formatEther(
            votePowerAccount1
        )} units`
    );

    // Self delegate
    const delegateTx = await contract
        .connect(account1)
        .delegate(account1.address)
    const delegateTxReceipt = await delegateTx.wait();
    console.log(
        `Tokens delegated from ${account1.address} for ${account1.address
        } at block ${delegateTxReceipt.blockNumber}`
      );

    // Mint some  more tokens
    const mintTx2 = await contract.mint(account2.address, MINT_VALUE);
    const mintTx2Receipt = await mintTx2.wait();
    console.log(
        `Tokens minted for ${account2.address} at the block ${mintTxReceipt.blockNumber}`
    );
    const tokenBalanceAccount2 = await contract.balanceOf(account2.address);
    console.log(
        `Account 2 has a balance of ${ethers.utils.formatUnits(
            tokenBalanceAccount2
        )} Vote Tokens`
    );

    // What block am I at?
    const currentBlock = await ethers.provider.getBlock("latest");
    console.log(`The current block number is ${currentBlock.number}`);
    
    // Check the historic voting power
    votePowerAccount1 = await contract.getPastVotes(
        account1.address,
        currentBlock.number - 1
    );
    console.log(
        `Account 1 has vote power of ${ethers.utils.formatEther(
            votePowerAccount1
        )} units at block ${currentBlock.number - 1}`
    );
    votePowerAccount1 = await contract.getPastVotes(
        account1.address,
        currentBlock.number - 2
    );
    console.log(
        `Account 1 has vote power of ${ethers.utils.formatEther(
            votePowerAccount1
        )} units at block ${currentBlock.number - 2}`
    );  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;

});