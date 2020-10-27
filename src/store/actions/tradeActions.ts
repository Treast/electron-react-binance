export interface IKlineTrade {
  symbol: string;
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ITradeAction {
  type: string;
  payload: any;
  symbol: string;
}

export const ADD_TRADE = 'ADD_TRADE';
export const ADD_BULK_TRADE = 'ADD_BULK_TRADE';
export const SET_BULK_TRADE = 'SET_BULK_TRADE';

export const addTrade = (trade: IKlineTrade) => ({ type: ADD_TRADE, trade });
export const addBulkTrade = (trades: IKlineTrade[]) => ({ type: ADD_BULK_TRADE, trades });
