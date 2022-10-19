// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "./Crowdsale.sol";

contract MyCrowdsale is Crowdsale {
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
    {

    }
}

