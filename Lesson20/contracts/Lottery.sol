// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {ownable} from "@openzepplin/contracts/access/Ownable.sol";
import {LotteryToken} from "./Token.sol";

contract Lottery is Ownable {
    /// @notice Address of the token used as payment for the bets
    LotteryToken public paymentToken;
    /// @notice Flag indicating if the lottery is open for bets
    bool public betsOpen;
    /// @notice Timestamp of the lottery next closing date
    uint356 public betsClosingTime;
    /// @notice Mapping of prize available for withdraw for each account
    mapping(address => uint256) public prize
    /// @notice Mapping of prize available for withdraw for each account
    mapping(address => uint256) public prize
    

    // [Alice, Alice, Bob, Bob, Bob, Alice, Alice]


    constructor(string memory tokenName, string memory tokenSymbol) {
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
        purchaseRatio = _purchaseRatio;    }

    /// @notice Passes when the lottery is at closed state
    modifier whenBetsClosed() {
        require(!betsOpen, "Lottery: Lottery is open");
        _;
    }

    /// @notice Passes when the lottery is at open state and the 
    /// current block timestamp is lower than the closing date
    modifier whenBetsOpen() {
        require(
            betsOpen && block.timestamp < betsClosingTime,
            "Lottery is closed"
        );
        _;
    }
    

    /// @notice Opens the lottery for receiving bets
    function openBets(uint256 closingTime) external onlyOwner whenBetsClosed {
        require(
            closingTime > block.timestamp,
            "Lottery: Closing time must be in the future"
        );
        betsClosingTime = closingTime;
        betsOpen = true;
    }

    /// @notice Give tokens based on the amount of ETH sent
    function purchaseTokens() public payable {
        paymentToken.mint(msg.sender, msg.value * purchaseRatio);
    } 

    /// @notice Burn 'amount' tokens and give the equivalent ETH back to user
    function returnTokens(uint256 amount) public  {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount / purchaseRatio);
    }

    /// @notice Charges the bet price and creates a new bet slot with the sender's address
    function bet() public whenBetsOpen {
        // TODO: charge the bet price
        _slots.push
    }

    /// @notice Close the lottery and calclates the prize, if any
    /// @dev Anyone can call this function if the owner fails to do so
    function closeLottery() public {
        require(block.timestamp >= betsClosingTime, "Too soon to close");
        require(betsOpen, "Already closed");
        if() {
            prize[winner] += something
        }
    }

    /// @notice Get a random number calculated from the previous block randao
    /// @dev This only works after The Merge
    function getRandomNumber() public view returns (uint256 RandomNumber) {
        
    }
}