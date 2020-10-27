export const SET_WALLET = 'SET_WALLET';
export const SET_ORDERS = 'SET_ORDERS';
export const UPDATE_PRICE = 'UPDATE_PRICE';

export enum EAssetType {
  SPOT = 'SPOT',
  MARGIN = 'MARGIN',
}

export interface IWalletAction {
  type: string;
  payload: any;
}

export interface IWalletAsset {
  symbol: string;
  free: number;
  locked: number;
  total: number;
  estimation: string;
  type: string;
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

export const getSpotBalance = (state: IWallet) => state.balances.filter((balance) => balance.type === EAssetType.SPOT);
export const getMarginBalance = (state: IWallet) => state.balances.filter((balance) => balance.type === EAssetType.MARGIN);
