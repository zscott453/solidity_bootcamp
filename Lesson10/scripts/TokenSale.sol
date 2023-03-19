// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./MyERC20.sol";

interface IMyToken {
    function mint(address to, uint256 amount) external;
    
}

contract TokenSale {
    uint256 public ratio;
    IMyToken public tokenAddress;

    constructor(uint256 _ratio, address _tokenAddress) {
        ratio = _ratio;
        tokenAddress = IMyToken(_tokenAddress);
    }

    function buyTokens() external payable {
        tokenAddress.mint(msg.sender, msg.value * ratio);

    }
}