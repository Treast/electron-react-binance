import React, { FunctionComponent, useEffect, useState } from 'react';
import Binance from '../services/Binance';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import { IKlineTrade } from '../store/actions/tradeActions';

interface ICandlestickChartProps {
  symbol: string;
  interval?: string;
  markets: any;
}

const CandlestickChart: FunctionComponent<ICandlestickChartProps> = ({ symbol, markets }) => {
  const [trades, setTrades] = useState([] as any[]);

  useEffect(() => {
    Binance.getRecentTradeCandlestick(symbol);
    Binance.getTradeCandlestick(symbol);
  }, [symbol]);

  useEffect(() => {
    const output: any[] = [];
    if (markets[symbol]) {
      markets[symbol].map((trade: IKlineTrade) => {
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

    setTrades(output);
  }, [markets]);

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

const mapStateToProps = (state: any) => {
  return {
    markets: state.markets,
  };
};

export default connect(mapStateToProps)(CandlestickChart);
