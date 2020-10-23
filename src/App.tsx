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
            <div className='col-md-12'></div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
