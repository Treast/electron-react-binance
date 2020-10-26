import { createStore, combineReducers } from 'redux';

import trades from './reducers/trades';

const reducers = combineReducers({
  markets: trades,
});

export const store = createStore(reducers);
