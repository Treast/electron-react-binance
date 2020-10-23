import { ADD_TRADE, IKlineTrade, ITradeAction } from '../actions/tradeActions';

const initialState: Map<string, IKlineTrade[]> = new Map<string, IKlineTrade[]>();

const trades = (state = initialState, action: ITradeAction) => {
  switch (action.type) {
    case ADD_TRADE:
      if (state.has(action.payload.pair)) {
      }
      break;
  }
};

export default trades;
