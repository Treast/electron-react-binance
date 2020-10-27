import { createStore, combineReducers } from 'redux';

import trades from './reducers/trades';
import wallet from './reducers/wallet';

const reducers = combineReducers({
  markets: trades,
  wallet: wallet,
});

// @ts-ignore
export const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
