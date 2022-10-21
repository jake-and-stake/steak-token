const { contracts_build_directory } = require("../truffle-config");

const MyToken = artifacts.require("MyToken");
const MyCrowdsale = artifacts.require("MyCrowdsale");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("MyCrowdsale test", async accounts => {

    const [deployerAccount, recipient] = accounts;

    it("should should not have any tokens in my deployerAccount", async() => {
        let instance = await MyToken.deployed();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
});