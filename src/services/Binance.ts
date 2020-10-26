// import WebSocket from 'ws';
import config from '../config/binance.json';
import { IKlineTrade } from '../store/actions/tradeActions';
import { store } from '../store/store';
import HMAC256 from 'crypto-js/hmac-sha256';

class Binance {
  private apiKey: string;
  private secretKey: string;

  private baseStreamUrl: string = 'wss://stream.binance.com:9443';
  private baseApiUrl: string = 'https://api.binance.com';

  constructor() {
    this.apiKey = config.apiKey;
    this.secretKey = config.secretKey;
  }

  getTradeCandlestick(symbol: string, interval: string = '1m') {
    const stream = `${this.baseStreamUrl}/ws/${symbol.toLocaleLowerCase()}@kline_${interval}`;

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
  }

  getRecentTradeCandlestick(symbol: string, interval: string = '1m') {
    fetch(`${this.baseApiUrl}/api/v3/klines?symbol=${symbol}&interval=${interval}`)
      .then((res) => res.json())
      .then((res) => {
        store.dispatch({
          type: 'ADD_BULK_TRADE',
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
        console.log('Res', res);
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
