import { copyFile } from 'fs';
import { EAssetType, UPDATE_PRICE } from '../store/actions/walletActions';
import { store } from '../store/store';

interface CoinGeckoCoin {
  id: string;
  symbol: string;
}

class CoinGecko {
  private baseApiUrl: string = 'https://api.coingecko.com/api/v3';
  private coins: CoinGeckoCoin[] = [];

  constructor() {}

  getCoinList() {
    fetch(`${this.baseApiUrl}/coins/list`)
      .then((res) => res.json())
      .then((res) => {
        res.map((coin: any) => {
          this.coins.push({
            id: coin.id,
            symbol: coin.symbol,
          });
        });
      });
  }

  getCoinPrice(symbol: string, amount: number, type: EAssetType): Promise<string> {
    return new Promise((resolve, reject) => {
      const coin = this.coins.find((coin) => coin.symbol === symbol.toLocaleLowerCase());

      if (coin) {
        fetch(`${this.baseApiUrl}/simple/price?ids=${coin.id}&vs_currencies=eur`)
          .then((res) => res.json())
          .then((res) => {
            const price = res[coin.id]['eur'];
            const total = price * amount;
            store.dispatch({
              type: UPDATE_PRICE,
              payload: {
                symbol,
                estimation: total.toFixed(2),
                type,
              },
            });
          })
          .catch((err) => reject(err));
      }

      resolve('0.00');
    });
  }
}

export default new CoinGecko();
