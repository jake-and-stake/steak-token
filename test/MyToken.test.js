const { contracts_build_directory } = require("../truffle-config");

const MyToken = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("MyToken test", async accounts => {
    it("should put 1000000 tokens in the first account", async () => {
        let instance = await MyToken.deployed();
        let totalSupply = await instance.totalSupply();
        expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
    });
});