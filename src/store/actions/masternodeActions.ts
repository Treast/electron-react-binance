export const ADD_MASTERNODE = 'ADD_MASTERNODE';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export interface IMasternode {
  name: string;
  symbol: string;
  balance: number;
  transactions: IMasternodeTransaction[];
}

export interface IMasternodeTransaction {
  amount: number;
  time: number;
}

export interface IMasternodeAction {
  type: string;
  payload: any;
}
