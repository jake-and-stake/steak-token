const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;
require("dotenv").config({path: "./.env"});

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      network_id: 1337
    },
    goerli_testnet: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://goerli.infura.io/v3/d0209322abaf4ee988bcbdde4de9ce7a", AccountIndex);
      },
      network_id: 5
    },
    ropsten_testnet: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/d0209322abaf4ee988bcbdde4de9ce7a", AccountIndex);
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "^0.8.3"
    }
  }
};
