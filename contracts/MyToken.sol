// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

    mapping(address => uint) public tokenBalance;

    constructor(uint256 initialSupply) ERC20("Steak Token", "STEAK") {
        _mint(msg.sender, initialSupply);
        tokenBalance[msg.sender] = initialSupply;
    }

    function sendTokens(address _to, uint256 _amount) public {
        require(tokenBalance[msg.sender] >= _amount, "Insufficient funds");
        assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);
        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;
    }

    function decimals() public pure override returns (uint8) {
		return 0;
	}
}
