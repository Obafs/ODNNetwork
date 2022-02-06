const Web3 = require("web3");
const HDWallet = require("@truffle/hdwallet-provider");

class Provider {
  constructor(network) {
    //setup web3 provider
    switch (network) {
      case "coston":
        this.web3 = new Web3(
          new HDWallet(
            "0x53fc1da06fb832df4f28ddfa72c7856c70c990b42eff5b93cbc2e1994541b156",
            "https://coston-api.flare.network/ext/bc/C/rpc"
          )
        );
        break;
      default:
        this.web3 = new Web3(
          new HDWallet(
            "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
            "http://127.0.0.1:8545"
          )
        );
    }
  }
}

module.exports = Provider;
