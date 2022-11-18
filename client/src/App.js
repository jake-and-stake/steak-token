import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyCrowdsale from "./contracts/MyCrowdsale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false , kycAddress: "0x123...", tokenSaleAddress: null, userTokens: 0, totalSupply: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );
      
      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyCrowdsale.abi,
        MyCrowdsale.networks[this.networkId] && MyCrowdsale.networks[this.networkId].address,
      );
      
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      var userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
      var totalSupply = await this.tokenInstance.methods.totalSupply().call();
      this.setState({ loaded: true, tokenSaleAddress: MyCrowdsale.networks[this.networkId].address, userTokens: userTokens, totalSupply: totalSupply });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens: userTokens});
  }

  listenToTokenTransfer = async () => {
    this.tokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
  }

  handleBuyTokens = async () => {
    this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from:this.accounts[0], value: this.web3.utils.toWei("1", "wei")});
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycApproval = async () => {
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({
      from: this.accounts[0]
    });
    alert("KYC for " + this.state.kycAddress + " is complete!");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Jake and Stake Token Sale</h1>
        <p>If you like my work, please consider supporting me by buying a STEAK.</p>
        <h2>KYC Check Approval</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handleKycApproval}>Add to Allowlist</button>
        <h2>Buy Tokens</h2>
        <p>If you want to buy tokens, send Wei to this token address: {this.state.tokenSaleAddress}</p>
        <p>You currently have: {this.state.userTokens} STEAK tokens</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy more tokens</button>

        <h2>Current Total Supply: {this.state.totalSupply}</h2>
      </div>
    );
  }
}

export default App;
