import CoinGecko from '../../services/CoinGecko';
import { IWallet, IWalletAction, SET_ORDERS, SET_WALLET, UPDATE_PRICE } from '../actions/walletActions';

const initialState: IWallet = {
  balances: [],
  orders: [],
};

const CURRENCY_ESTIMATION = 'EUR';

export const formatAmount = (amount: number | string, decimals: number = 8) => {
  if (amount === null) amount = 0;
  const float = parseFloat(amount.toString());
  return Math.round((float + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
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
      state.balances
        .filter((balance) => balance.type === action.payload.type)
        .forEach((balance) => {
          balance.free = 0;
          balance.locked = 0;
          balance.total = 0;
          balance.estimation = '0';
        });

      const otherWallet = state.balances.filter((balance) => balance.type !== action.payload.type);

      const wallet = action.payload.balances
        .filter((balance: any) => {
          return formatAmount(balance.free) + formatAmount(balance.locked) > 0;
        })
        .map((asset: any) => {
          const balance = {
            symbol: asset.asset,
            free: formatAmount(asset.free),
            locked: formatAmount(asset.locked),
            total: formatAmount(formatAmount(asset.locked) + formatAmount(asset.free)),
            estimation: '0',
            type: action.payload.type,
          };

          if (asset.asset === CURRENCY_ESTIMATION) balance.estimation = (balance.free + balance.locked).toFixed(2);
          else {
            CoinGecko.getCoinPrice(asset.asset, balance.free + balance.locked, action.payload.type);
          }

          return balance;
        });

      state.balances = [...otherWallet, ...wallet];
      break;

    case UPDATE_PRICE:
      const assetIndex = state.balances.findIndex((balance) => balance.symbol === action.payload.symbol && balance.type === action.payload.type);

      if (assetIndex > -1) {
        state.balances[assetIndex].estimation = action.payload.estimation;
      }
      break;
  }

  return { ...state };
};

export default wallet;
