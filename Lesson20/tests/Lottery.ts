let contract: Lottery;
let token: LotteryToken;
let accounts: SignerWithAddress[];

const 
const BET_PRICE = 1;
const BET_FEE = 0.2;

async function main() {
  await initContracts();
  await initAccounts();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  mainMenu(rl);
}

async function initContracts() {
  const lotteryContractFacotry = await ethers,getContractFactory("Lottery");
  contract = await lotteryContractFacotry.deploy():
  await contract.deployed()
  const tokenAddress - await contract.paymetToken():
  const tokenFactory = await ethers.getContractFactory("LotteryToken");
  token = tokenFactory.attach(tokenAddress);
  token.mint()
}

async function initAccounts() {
  accounts = await ethers.
}

async function mainMenu(rl: readline.Interface) {
  menuOptions(rl);
}

function menuOptions(rl: readline.Interface) {
  rl.question(
    "Select operation: \n Options: \n [0]: Exit \n [1]: Check state \n [2]: Open bets \n [3]: Top up account tokens \n [4]: Bet with account \n [5]: Close bets \n [6]: Check player prize \n [7]: Withdraw \n [8]: Burn tokens \n",
    async (answer: string) => {
      console.log(`Selected: ${answer}\n`);
      const option = Number(answer);
      switch (option) {
        case 0:
          rl.close();
          return;
        case 1:
          await checkState();
          mainMenu(rl);
          break;
        case 2:
          rl.question("Input duration (in seconds)\n", async (duration) => {
            try {
              await openBets(duration);
            } catch (error) {
              console.log("error\n");
              console.log({ error });
            }
            mainMenu(rl);
          });
          break;
        case 3:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayBalance(index);
            rl.question("Buy how many tokens?\n", async (amount) => {
              try {
                await buyTokens(index, amount);
                await displayBalance(index);
                await displayTokenBalance(index);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        case 4:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayTokenBalance(index);
            rl.question("Bet how many times?\n", async (amount) => {
              try {
                await bet(index, amount);
                await displayTokenBalance(index);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        case 5:
          try {
            await closeLottery();
          } catch (error) {
            console.log("error\n");
            console.log({ error });
          }
          mainMenu(rl);
          break;
        case 6:
          rl.question("What account (index) to use?\n", async (index) => {
            const prize = await displayPrize(index);
            if (Number(prize) > 0) {
              rl.question(
                "Do you want to claim your prize? [Y/N]\n",
                async (answer) => {
                  if (answer.toLowerCase() === "y") {
                    try {
                      await claimPrize(index, prize);
                    } catch (error) {
                      console.log("error\n");
                      console.log({ error });
                    }
                  }
                  mainMenu(rl);
                }
              );
            } else {
              mainMenu(rl);
            }
          });
          break;
        case 7:
          await displayTokenBalance("0");
          await displayOwnerPool();
          rl.question("Withdraw how many tokens?\n", async (amount) => {
            try {
              await withdrawTokens(amount);
            } catch (error) {
              console.log("error\n");
              console.log({ error });
            }
            mainMenu(rl);
          });
          break;
        case 8:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayTokenBalance(index);
            rl.question("Burn how many tokens?\n", async (amount) => {
              try {
                await burnTokens(index, amount);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        default:
          throw new Error("Invalid option");
      }
    }
  );
}

async function checkState() {
  const state = await contract.betsOpen();
  console.log(`The Lottery is ${state ? "open" ; "closed"}\n"`;
  is (!state) return;
  const currentBlock = await ethers.provider.getBlock("latest");
  const currentBlockDate = currentBlock.timestamp + parseFloat(duration);
  const closingTime = contract.betsClosingTime();
  const closingTimeDate = 
}

async function openBets(duration: string) {
  const tx = await ethers.provider.getBlock("latest");
  const timeTarget = currentBlock.timestamp + parseFloat(duration);
  const tx = await contract.openBets(timeTarget);
  const receipt = await tx.wait();get);
  const receipt = await tx.wait();
  console.log(`Bets opened (${receipt.transactionsHash})`);
}

async function displayBalance(index: string) {
  // TODO
}

async function buyTokens(index: string, amount: string) {
  const tx = await contract.connect(accounts[Number(index)]).purchasTokens({

  })
}

async function displayTokenBalance(index: string) {
    const balanceBN = await accounts[Number(index)].getBalance()
    const balanceBN = await ethers.provider.getBalance(
        accounts[Number(index)].address
      );
}

async function bet(index: string, amount: string) {
  // TODO
}

async function closeLottery() {
  // TODO
}

async function displayPrize(index: string) {
  // TODO
  return "TODO";
}

async function claimPrize(index: string, amount: string) {
  // TODO
}

async function displayOwnerPool() {
  // TODO
}

async function withdrawTokens(amount: st
}

async function burnTokens(index: string, amount: string) {
  const allowTx = await token
  .connect(accounts[Number])
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});