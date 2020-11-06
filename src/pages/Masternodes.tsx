import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '../components/Container';
import { Header } from '../components/Header';

import Masternode from '../services/Masternode';
import { IMasternode } from '../store/actions/masternodeActions';
import { formatAmount } from '../store/reducers/wallet';

export const Masternodes = () => {
  useEffect(() => {
    Masternode.getBalance();
    Masternode.getTransactions();
  }, []);

  const masternodes = useSelector((state: any) => {
    state.masternodes.map((masternode: any) => {
      masternode.lastDay = masternode.transactions
        .filter((transaction: any) => transaction.time > Math.round(Date.now() / 1000) - 60 * 60 * 24)
        .reduce((acc: number, val: any) => acc + val.amount, 0);
      masternode.lastWeek = masternode.transactions
        .filter((transaction: any) => transaction.time > Math.round(Date.now() / 1000) - 60 * 60 * 24 * 7)
        .reduce((acc: number, val: any) => acc + val.amount, 0);
      masternode.lastMonth = masternode.transactions
        .filter((transaction: any) => transaction.time > Math.round(Date.now() / 1000) - 60 * 60 * 24 * 30)
        .reduce((acc: number, val: any) => acc + val.amount, 0);

      masternode.lastDay = formatAmount(masternode.lastDay, 4);
      masternode.lastWeek = formatAmount(masternode.lastWeek, 4);
      masternode.lastMonth = formatAmount(masternode.lastMonth, 4);
      masternode.balance = formatAmount(masternode.balance, 4);

      return masternode;
    });

    return state.masternodes;
  });

  return (
    <div id='wallet'>
      <Header>
        <h1 className='h1 text-white col-12 mb-3'>Masternodes</h1>
      </Header>
      <Container>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-header bg-transparent'>
                <div className='row align-items-center'>
                  <div className='col'>
                    <h5 className='h3 mb-0'>Masternodes</h5>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <table className='table table-order'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Name</th>
                      <th>Balance</th>
                      <th>Last day</th>
                      <th>Last week</th>
                      <th>Last month</th>
                      <th className='text-right'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masternodes.map((masternode: any, index: number) => (
                      <tr key={index}>
                        <td>{masternode.name}</td>
                        <td>
                          {masternode.balance} {masternode.symbol}
                        </td>
                        <td>
                          {masternode.lastDay} {masternode.symbol}
                        </td>
                        <td>
                          {masternode.lastWeek} {masternode.symbol}
                        </td>
                        <td>
                          {masternode.lastMonth} {masternode.symbol}
                        </td>
                        <td className='text-right'>
                          <span className='badge badge-success'>Online</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
