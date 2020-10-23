import WebSocket from 'ws';
import config from '../config/binance.json';

class Binance {
  private apiKey: string;
  private secretKey: string;

  private baseStreamUrl: string = 'wss://stream.binance.com:9443';

  constructor() {
    this.apiKey = config.apiKey;
    this.secretKey = config.secretKey;
  }

  getTradeCandlestick(pair: string, interval: string = '1m') {
    const stream = `${this.baseStreamUrl}/ws/${pair}${interval}@kline_${interval}`;

    const ws = new WebSocket(stream);

    ws.on('open', () => console.log('Connected to stream'));
    ws.on('close', () => console.log('Disconnected from stream'));
    ws.on('ping', () => ws.pong());
    ws.on('message', () => {});
  }
}

export default new Binance();
