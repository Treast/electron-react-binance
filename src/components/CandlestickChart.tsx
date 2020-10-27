import React, { FunctionComponent, useEffect } from 'react';
import Binance from '../services/Binance';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { IKlineTrade } from '../store/actions/tradeActions';

interface ICandlestickChartProps {
  symbol: string;
  interval?: string;
}

export const CandlestickChart: FunctionComponent<ICandlestickChartProps> = ({ symbol }) => {
  useEffect(() => {
    Binance.getRecentTradeCandlestick(symbol);
    Binance.getTradeCandlestick(symbol);

    return () => {
      Binance.closeCandlestickStream(symbol);
    };
  }, [symbol]);

  const trades = useSelector((state: any) => {
    const output: any[] = [];

    if (state.markets[symbol]) {
      state.markets[symbol].map((trade: IKlineTrade) => {
        const date = new Date();
        date.setTime(trade.time);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const tradeTime = `${hours}:${minutes}`;

        output.push({
          x: tradeTime,
          y: [trade.open, trade.high, trade.low, trade.close],
        });
      });
    }

    return output;
  });

  return (
    <Chart
      type='candlestick'
      height='400'
      series={[
        {
          data: trades,
        },
      ]}
      options={{
        chart: {
          id: 'basic-bar',
          toolbar: false,
        },
        xaxis: {
          labels: {
            offsetY: 5,
            style: {
              colors: '#FFF',
            },
          },
          tickAmount: 10,
        },
        yaxis: {
          labels: {
            style: {
              colors: '#FFF',
            },
          },
        },
      }}
    />
  );
};
