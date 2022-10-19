/*
  https://trufflesuite.com/docs/truffle/getting-started/running-migrations/
*/

// Fetch the contract data from the Migrations.json file
var Migrations = artifacts.require("Migrations");

// deployer is the Turffle wrapper for deploying contracts to the network
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
