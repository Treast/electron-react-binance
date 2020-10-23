import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/argon.scss';

import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import OverlayScrollbars from 'overlayscrollbars';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Container } from './components/Container';
import { Card } from './components/Card';

import { AccountBalanceWalletOutlined, AccountBalanceOutlined } from '@material-ui/icons';

function App() {
  useEffect(() => {
    OverlayScrollbars(document.querySelectorAll('body, .sidenav'), {
      scrollbars: {
        autoHide: 'scroll',
      },
    });
  });

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
            <div className='col-md-12'>
              <div className='col-xl-8'>
                <div className='card bg-default'>
                  <div className='card-header bg-transparent'>
                    <div className='row align-items-center'>
                      <div className='col'>
                        <h6 className='text-light text-uppercase ls-1 mb-1'>Overview</h6>
                        <h5 className='h3 text-white mb-0'>Sales value</h5>
                      </div>
                      <div className='col'>
                        <ul className='nav nav-pills justify-content-end'>
                          <li
                            className='nav-item mr-2 mr-md-0'
                            data-toggle='chart'
                            data-target='#chart-sales-dark'
                            data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}'
                            data-prefix='$'
                            data-suffix='k'
                          >
                            <a href='#' className='nav-link py-2 px-3 active' data-toggle='tab'>
                              <span className='d-none d-md-block'>Month</span>
                              <span className='d-md-none'>M</span>
                            </a>
                          </li>
                          <li
                            className='nav-item'
                            data-toggle='chart'
                            data-target='#chart-sales-dark'
                            data-update='{"data":{"datasets":[{"data":[0, 20, 5, 25, 10, 30, 15, 40, 40]}]}}'
                            data-prefix='$'
                            data-suffix='k'
                          >
                            <a href='#' className='nav-link py-2 px-3' data-toggle='tab'>
                              <span className='d-none d-md-block'>Week</span>
                              <span className='d-md-none'>W</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='card-body'>
                    <div className='chart'>
                      <canvas id='chart-sales-dark' className='chart-canvas'></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
