/*
    The artifact object describe the contract addresses, the networks on which the
    contracts have been previously deployed, and the functions the contracts have.
*/


var MyToken = artifacts.require("MyToken");
var MyCrowdsale = artifacts.require("MyCrowdsale");
var MyKycContract = artifacts.require("KycContract");

// Get predefined environnment (variables, etc)
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    // Get accounts from web3
    let addr = await web3.eth.getAccounts();

    // Deploy Contracts using the constructors
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(MyKycContract);
    await deployer.deploy(MyCrowdsale, 1, addr[0], MyToken.address, MyKycContract.address);
    let instance = await MyToken.deployed();
    await console.log(instance);
    // ERC20 function
    await instance.transfer(MyCrowdsale.address, process.env.INITIAL_TOKENS);
}