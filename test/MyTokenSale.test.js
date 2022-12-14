const { contracts_build_directory } = require("../truffle-config");

const MyToken = artifacts.require("MyToken");
const MyCrowdsale = artifacts.require("MyCrowdsale");
const KycContract = artifacts.require("KycContract");

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

    it("all tokens should be in the TokenSale contract by default", async() => {
        let token = await MyToken.deployed();
        let totalSupply = await token.totalSupply();
        // Access ABI of deployed smart contract address and get balance
        let balanceOfTokenSaleSmartContract = await token.balanceOf(MyCrowdsale.address);
        await expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("should not be possible to buy tokens if not kyc'd", async () => {
        let instance = await MyCrowdsale.deployed();
        await expect(instance.sendTransaction({
            from: deployerAccount,
            value: "1000000000000000000"
        })).to.eventually.be.rejected;
    });

    it("should be possible to buy tokens if kyc'd", async () => {
        let tokenInstance = await MyToken.deployed();
        let tokenSaleInstance = await MyCrowdsale.deployed();
        let kycInstance = await KycContract.deployed();

        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        
        await expect(tokenSaleInstance.sendTransaction({
            from: deployerAccount,
            value: web3.utils.toWei("1", "wei")
        })).to.be.fulfilled;
        return await expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });

});