export const SET_WALLET = 'SET_WALLET';
export const SET_ORDERS = 'SET_ORDERS';

export interface IWalletAction {
  type: string;
  payload: any;
}

export interface IWalletAsset {
  symbol: string;
  amount: number;
}

export interface IWalletOrder {
  symbol: string;
  price: number;
  quantity: number;
  status: string;
  side: string;
}

export interface IWallet {
  balances: IWalletAsset[];
  orders: IWalletOrder[];
}
