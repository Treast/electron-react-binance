import { ADD_BULK_TRADE, ADD_TRADE, IKlineTrade, ITradeAction, SET_BULK_TRADE } from '../actions/tradeActions';

const initialState: any = {};

const formatTrade = (payload: IKlineTrade) => {
  return {
    close: payload.close,
    open: payload.open,
    high: payload.high,
    low: payload.low,
    time: payload.time,
    symbol: payload.symbol,
  };
};

const trades = (state = initialState, action: ITradeAction) => {
  switch (action.type) {
    case ADD_TRADE:
      if (!state[action.symbol]) {
        state[action.symbol] = [];
      }

      const trade = formatTrade(action.payload);

      const existingTradeIndex = state[action.symbol].findIndex((e: any) => e.time === trade.time);

      if (existingTradeIndex > -1) {
        state[action.symbol][existingTradeIndex] = trade;
      } else {
        state[action.symbol].push(trade);
      }

      break;

    case ADD_BULK_TRADE:
      if (!state[action.symbol]) {
        state[action.symbol] = [];
      }

      const trades = action.payload.map((trade: any) =>
        formatTrade({
          close: trade[4],
          time: trade[0],
          symbol: action.symbol,
          open: trade[1],
          low: trade[3],
          high: trade[2],
        })
      );

      state[action.symbol].push(...trades);

      break;

    case SET_BULK_TRADE:
      if (!state[action.symbol]) {
        state[action.symbol] = [];
      }

      const setTrades = action.payload.map((trade: any) =>
        formatTrade({
          close: trade[4],
          time: trade[0],
          symbol: action.symbol,
          open: trade[1],
          low: trade[3],
          high: trade[2],
        })
      );

      state[action.symbol] = [...setTrades];

      break;
  }

  if (state[action.symbol]) {
    state[action.symbol] = state[action.symbol].filter((entry: any) => entry.time > Date.now() - 60 * 60 * 1000);
  }

  return { ...state };
};

export default trades;
