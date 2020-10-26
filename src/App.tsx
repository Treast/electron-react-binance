import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/argon.scss';

import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import OverlayScrollbars from 'overlayscrollbars';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Container } from './components/Container';
import { Card } from './components/Card';
import CandlestickChart from './components/CandlestickChart';

import { AccountBalanceWalletOutlined, AccountBalanceOutlined } from '@material-ui/icons';
import Binance from './services/Binance';

const App = () => {
  useEffect(() => {
    OverlayScrollbars(document.querySelectorAll('body, .sidenav'), {
      scrollbars: {
        autoHide: 'scroll',
      },
    });

    Binance.getOpenedOrders('BTCEUR');
  }, []);

  return (
    <div className='App'>
      <Sidebar />
      <div className='main-content' id='panel'>
        <Header>
          <h1 className='h1 text-white col-12 mb-3'>Overview</h1>
          <Card icon={<AccountBalanceWalletOutlined />} title='Balance' value='433.87€' color='bg-gradient-info' />
          <Card icon={<AccountBalanceOutlined />} title='Debt' value='123.45€' color='bg-gradient-green' />
        </Header>
        <Container>
          <div className='row'>
            <div className='col-xl-8'>
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
            <div className='col-xl-4'>
              <div className='card'>
                <div className='card-header'>
                  <h6 className='text-light text-uppercase ls-1 mb-1'>Overview</h6>
                  <h5 className='h3 mb-0'>Open trades</h5>
                </div>
                <div className='card-body'>
                  <table className='table'>
                    <thead className='thead-light'>
                      <tr>
                        <th>#</th>
                        <th>Pair</th>
                        <th>Price</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>BTC/USDT</td>
                        <td>11420.00</td>
                        <td>0.0015</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default App;
