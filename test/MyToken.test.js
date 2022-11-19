const { contracts_build_directory } = require("../truffle-config");

//Token artifact found in the MyToken.json file
const MyToken = artifacts.require("MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("MyToken test", async accounts => {

    // Define the accounts to test with, the first account is always used to deploye the
    // smart contract
    const [deployerAccount, recipient] = accounts;

    beforeEach(async() => {
        // Deploy a new version of this contract to the network (clean contract state)
        this.myToken = await MyToken.new();
    });

    it("should put 1000000 tokens in the first account", async () => {
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is not possible to send more tokens than available", async () => {
        let instance = await this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        await expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(balanceOfDeployer));
    });

    it("is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = await this.myToken;

        let minter_role = await instance.MINTER_ROLE();
        await instance.grantRole(minter_role, deployerAccount, {from: deployerAccount});
        await expect(instance.mint(deployerAccount, 1)).to.eventually.be.fulfilled;
        
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
});