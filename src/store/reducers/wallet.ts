import { symbol } from 'prop-types';
import { IWallet, IWalletAction, SET_ORDERS, SET_WALLET } from '../actions/walletActions';

const initialState: IWallet = {
  balances: [],
  orders: [],
};

const wallet = (state = initialState, action: IWalletAction) => {
  switch (action.type) {
    case SET_ORDERS:
      state.orders = action.payload.map((order: any) => {
        return {
          symbol: order.symbol,
          price: order.price,
          quantity: order.origQty,
          status: order.status,
          side: order.side,
        };
      });
      break;
    case SET_WALLET:
      state.balances = action.payload.map((asset: any) => {
        return {
          symbol: asset.asset,
          amount: asset.free + asset.locked,
        };
      });
      break;
  }

  return { ...state };
};

export default wallet;
