const { contracts_build_directory } = require("../truffle-config");

const MyToken = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("MyToken test", async accounts => {

    const [deployerAccount, recipient] = accounts;

    beforeEach(async() => {
        this.myToken = await MyToken.new(process.env.INITIAL_TOKENS);
    });

    it("should put 1000000 tokens in the first account", async () => {
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is not possible to send more tokens than available", async () => {
        let instance = await this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(balanceOfDeployer));
    });

    it("is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.a.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
});