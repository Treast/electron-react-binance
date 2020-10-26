import { createStore, combineReducers } from 'redux';

import trades from './reducers/trades';
import wallet from './reducers/wallet';

const reducers = combineReducers({
  markets: trades,
  wallet: wallet,
});

export const store = createStore(reducers);
