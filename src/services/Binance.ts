// import WebSocket from 'ws';
import config from '../config/binance.json';
import { IKlineTrade } from '../store/actions/tradeActions';
import { store } from '../store/store';
import HMAC256 from 'crypto-js/hmac-sha256';
import { EAssetType } from '../store/actions/walletActions';

class Binance {
  private apiKey: string;
  private secretKey: string;

  private baseStreamUrl: string = 'wss://stream.binance.com:9443';
  private baseApiUrl: string = 'https://api.binance.com';

  private wsCandleSticks: Map<string, WebSocket> = new Map<string, WebSocket>();

  constructor() {
    this.apiKey = config.apiKey;
    this.secretKey = config.secretKey;
  }

  getTradeCandlestick(symbol: string, interval: string = '1m') {
    const stream = `${this.baseStreamUrl}/ws/${symbol.toLocaleLowerCase()}@kline_${interval}`;

    this.closeCandlestickStream(symbol);

    const ws = new WebSocket(stream);

    ws.onopen = () => console.log(`Connected to stream ${stream}`);
    ws.onclose = () => console.log('Disconnected from stream');
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.k) {
        const kline: IKlineTrade = {
          close: data.k.c,
          high: data.k.h,
          low: data.k.l,
          open: data.k.o,
          symbol,
          time: data.k.T,
        };

        store.dispatch({ type: 'ADD_TRADE', payload: kline, symbol });
      }
    };

    this.wsCandleSticks.set(symbol, ws);
  }

  closeCandlestickStream(symbol: string) {
    if (this.wsCandleSticks.has(symbol)) {
      this.wsCandleSticks.get(symbol)?.close();
      this.wsCandleSticks.delete(symbol);
      console.log(`Closing streaming on ${symbol}`);
    }
  }

  getRecentTradeCandlestick(symbol: string, interval: string = '1m') {
    fetch(`${this.baseApiUrl}/api/v3/klines?symbol=${symbol}&interval=${interval}`)
      .then((res) => res.json())
      .then((res) => {
        store.dispatch({
          type: 'SET_BULK_TRADE',
          payload: res,
          symbol,
        });
      });
  }

  getOpenedOrders(symbol: string) {
    const timestamp = Date.now();

    const signature = this.stringifyParams({
      symbol,
      timestamp,
    });

    const secretSignature = this.generateSecretSignature(signature);

    fetch(`${this.baseApiUrl}/api/v3/openOrders?${signature}&signature=${secretSignature}`, {
      headers: {
        'X-MBX-APIKEY': this.apiKey,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch({
          type: 'SET_ORDERS',
          payload: res,
        });
      });
  }

  getAllOpenedOrders() {
    const timestamp = Date.now();

    const signature = this.stringifyParams({
      timestamp,
    });

    const secretSignature = this.generateSecretSignature(signature);

    fetch(`${this.baseApiUrl}/api/v3/openOrders?${signature}&signature=${secretSignature}`, {
      headers: {
        'X-MBX-APIKEY': this.apiKey,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch({
          type: 'SET_ORDERS',
          payload: res,
        });
      });
  }

  getSpotBalances() {
    const timestamp = Date.now();

    const signature = this.stringifyParams({
      timestamp,
    });

    const secretSignature = this.generateSecretSignature(signature);

    fetch(`${this.baseApiUrl}/api/v3/account?${signature}&signature=${secretSignature}`, {
      headers: {
        'X-MBX-APIKEY': this.apiKey,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch({
          type: 'SET_WALLET',
          payload: {
            balances: res.balances,
            type: EAssetType.SPOT,
          },
        });
      });
  }

  getMarginBalances() {
    const timestamp = Date.now();

    const signature = this.stringifyParams({
      timestamp,
    });

    const secretSignature = this.generateSecretSignature(signature);

    fetch(`${this.baseApiUrl}/sapi/v1/margin/account?${signature}&signature=${secretSignature}`, {
      headers: {
        'X-MBX-APIKEY': this.apiKey,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        store.dispatch({
          type: 'SET_WALLET',
          payload: {
            balances: res.userAssets,
            type: EAssetType.MARGIN,
          },
        });
      });
  }

  getAveragePrice(symbol: string, amount: number): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseApiUrl}/api/v3/avgPrice?symbol=${symbol}`)
        .then((res) => res.json())
        .then((res) => {
          const price: number = res.price * amount;
          resolve(price.toFixed(2));
        })
        .catch((err) => reject(err));
    });
  }

  private generateSecretSignature(signature: string) {
    return HMAC256(signature, this.secretKey);
  }

  private stringifyParams(params: any) {
    return Object.keys(params)
      .map((param) => {
        return `${param}=${params[param]}`;
      })
      .join('&');
  }
}

export default new Binance();
