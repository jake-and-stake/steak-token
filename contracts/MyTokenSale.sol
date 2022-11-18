// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "./Crowdsale.sol";
import "./KycContract.sol";
import "./ERC20Mintable.sol";

contract MyCrowdsale is Crowdsale {

    KycContract kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
        Crowdsale(rate, wallet, token)
    {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
        // Run code in base class Crowdsale._preValidatePurchase
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "KYC not completed, purchase not allowed.");
    }

    /**
     * @dev Overrides delivery by minting tokens upon purchase.
     * @param beneficiary Token purchaser
     * @param tokenAmount Number of tokens to be minted
     */
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal virtual override{
        // Potentially dangerous assumption about the type of the token.

        require(
            ERC20Mintable(address(token())).mint(beneficiary, tokenAmount),
                "MintedCrowdsale: minting failed"
        );
    }
}

