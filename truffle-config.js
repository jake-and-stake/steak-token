const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      network_id: 1337
    },
    truffle_local: {
      provider: function() {
        return new HDWalletProvider(Mnemonic, "http://localhost:8545", AccountIndex);
      },
      network_id: 1337
    }
  },
  compilers: {
    solc: {
      version: "^0.8.3"
    }
  }
};
