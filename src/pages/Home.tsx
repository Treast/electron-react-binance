import React from 'react';

import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { Card } from '../components/Card';
import { CandlestickChart } from '../components/CandlestickChart';
import { Orders } from '../components/Orders';

import { AccountBalanceWalletOutlined, AccountBalanceOutlined } from '@material-ui/icons';

export const Home = () => {
  return (
    <div id='home'>
      <Header>
        <h1 className='h1 text-white col-12 mb-3'>Overview</h1>
        <Card icon={<AccountBalanceWalletOutlined />} title='Balance' value='433.87€' color='bg-gradient-info' />
        <Card icon={<AccountBalanceOutlined />} title='Debt' value='123.45€' color='bg-gradient-green' />
      </Header>
      <Container>
        <div className='row'>
          <div className='col-xl-7'>
            <div className='card bg-default'>
              <div className='card-header bg-transparent'>
                <div className='row align-items-center'>
                  <div className='col'>
                    <h6 className='text-light text-uppercase ls-1 mb-1'>Overview</h6>
                    <h5 className='h3 text-white mb-0'>BTC / USDT</h5>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <div className='chart'>
                  <CandlestickChart symbol='BTCUSDT' />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-5'>
            <div className='card'>
              <div className='card-header'>
                <h6 className='text-light text-uppercase ls-1 mb-1'>Overview</h6>
                <h5 className='h3 mb-0'>Open trades</h5>
              </div>
              <div className='card-body'>
                <Orders />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
