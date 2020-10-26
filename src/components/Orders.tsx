import React from 'react';
import { useSelector } from 'react-redux';
import { IWalletOrder } from '../store/actions/walletActions';

export const Orders = () => {
  const orders = useSelector((state: any) => state.wallet.orders) as IWalletOrder[];

  const getBadge = (side: string) => {
    return side === 'BUY' ? 'success' : 'danger';
  };

  return (
    <table className='table table-order text-center'>
      <thead className='thead-light'>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Side</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: IWalletOrder, index: number) => (
          <tr key={index}>
            <th>{order.symbol}</th>
            <th>{order.quantity}</th>
            <th>{order.price}</th>
            <th>
              <span className={`badge badge-${getBadge(order.side)}`}>{order.side}</span>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
