// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Mintable.sol";

contract MyToken is ERC20Mintable {

    mapping(address => uint) public tokenBalance;

    constructor() ERC20Mintable("Steak Token", "STEAK") {
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
