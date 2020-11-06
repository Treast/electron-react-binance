import config from '../config/masternodes.json';
import { ADD_MASTERNODE, SET_TRANSACTIONS } from '../store/actions/masternodeActions';
import { store } from '../store/store';

class Masternode {
  constructor() {}

  getBalance() {
    const masternodes = config;

    masternodes.forEach((masternode) => {
      const params = {
        jsonrpc: '1.0',
        id: 1,
        method: 'getbalance',
        params: [],
      };

      fetch(`http://${masternode.host}:${masternode.port}/`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          Authorization: 'Basic ' + btoa(`${masternode.user}:${masternode.pass}`),
          'Content-Type': 'application/json-rpc',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          store.dispatch({
            type: ADD_MASTERNODE,
            payload: {
              name: masternode.name,
              symbol: masternode.symbol,
              balance: res.result,
              transactions: [],
            },
          });
        })
        .catch((err) => console.log(err));
    });
  }

  getTransactions() {
    const masternodes = config;

    masternodes.forEach((masternode) => {
      const params = {
        jsonrpc: '1.0',
        id: 1,
        method: 'listtransactions',
        params: ['*', 50000],
      };

      fetch(`http://${masternode.host}:${masternode.port}/`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          Authorization: 'Basic ' + btoa(`${masternode.user}:${masternode.pass}`),
          'Content-Type': 'application/json-rpc',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const recentTransactions = res.result.filter(
            (transaction: any) => transaction.time > Date.now() / 1000 - 60 * 60 * 24 && transaction.address == 'EPz4cEDHUVZjvZZ7NMDA6nQD9qijMHgiFq'
          );

          console.log(masternode.name, recentTransactions);
          console.log(
            masternode.name,
            recentTransactions.reduce((acc: number, val: any) => acc + val.amount, 0)
          );
          store.dispatch({
            type: SET_TRANSACTIONS,
            payload: {
              name: masternode.name,
              transactions: res.result,
            },
          });
        })
        .catch((err) => console.log(err));
    });
  }
}

export default new Masternode();
