import React, { Component } from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(
  "lyrics donor will pony rabbit response claw spice drive evoke provide switch",
  "https://mainnet.infura.io/v3/6327847cebdc4efd939c08ff6a6b2c09"
);

const web3 = new Web3(provider);
const data = [];
const columns = [
  {
    Header: "TxHash",
    accessor: "hash"
  },
  {
    Header: "Block",
    accessor: "block"
  },
  {
    Header: "Timestamp",
    accessor: "time"
  },
  {
    Header: "Gas Used",
    accessor: "gas"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: []
    };
  }

  async componentDidMount() {
    web3.eth.getBlockNumber().then(latestBlock => {
      for (var i = 0; i < 20; i++) {
        web3.eth.getBlock(latestBlock - i).then(block => {
          var number = block.number;
          var hash = block.hash;
          var time = block.timestamp;
          var gas = block.gasUsed;
          var date = new Date(time * 1000);

          var obj = {
            hash: hash,
            block: number,
            time: date.toUTCString(),
            gas: block.gasUsed
          };

          data.push(obj);
        });
      }

      if (i == 20) {
        this.setState({
          isLoaded: true,
          data: data
        });
      }
    });
  }

  render() {
    const { isLoaded, data } = this.state;
    // console.log(this.state.data);

    return (
      <div>
        <h1>Ethereum Block Explorer</h1>
        {isLoaded ? (
          <ReactTable columns={columns} data={data} />
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    );
  }
}

export default App;
