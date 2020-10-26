import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OverlayScrollbars from 'overlayscrollbars';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'overlayscrollbars/css/OverlayScrollbars.min.css';
import './assets/scss/argon.scss';

import { Sidebar } from './components/Sidebar';

import { Home } from './pages/Home';
import { Wallet } from './pages/Wallet';

import Binance from './services/Binance';

const App = () => {
  useEffect(() => {
    OverlayScrollbars(document.querySelectorAll('body, .sidenav'), {
      scrollbars: {
        autoHide: 'scroll',
      },
    });

    Binance.getAllOpenedOrders();
    Binance.getBalances();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Sidebar />
        <div className='main-content' id='panel'>
          <Switch>
            <Route path='/wallet'>
              <Wallet />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
