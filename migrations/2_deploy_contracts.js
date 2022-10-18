var MyToken = artifacts.require("MyToken");

module.exports = async function(deployer) {
    await deployer.deploy(MyToken, 1000000);
}