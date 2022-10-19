/*
    The artifact object describe the contract addresses, the networks on which the
    contracts have been deployed, and the functions the contracts have.
*/


var MyToken = artifacts.require("MyToken");
var MyCrowdsale = artifacts.require("MyCrowdsale");

module.exports = async function(deployer) {
    // Get accounts from web3
    let addr = await web3.eth.getAccounts();

    // Deploy Contracts using the constructors
    await deployer.deploy(MyToken, 1000000);
    await deployer.deploy(MyCrowdsale, 1, addr[0], MyToken.address);
    let instance = await MyToken.deployed();
    await instance.sendTokens(MyCrowdsale.address, 1000000);
    let balance = await instance.balanceOf(MyCrowdsale.address);
}