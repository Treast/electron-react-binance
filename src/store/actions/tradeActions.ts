export interface IKlineTrade {
  pair: string;
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ITradeAction {
  type: string;
  payload: IKlineTrade;
}

export const ADD_TRADE = 'ADD_TRADE';

export const addTrade = (trade: IKlineTrade) => ({ type: ADD_TRADE, trade });
