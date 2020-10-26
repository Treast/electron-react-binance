import React from 'react';
import { useSelector } from 'react-redux';
import { IWalletOrder } from '../store/actions/walletActions';

const Orders = () => {
  const orders = useSelector((state: any) => state.wallet.orders) as IWalletOrder[];

  const getBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'warning';
      case 'CANCELED':
        return 'danger';
      case 'FILLED':
        return 'success';
    }

    return 'primary';
  };

  return (
    <table className='table table-order text-center'>
      <thead className='thead-light'>
        <tr>
          <th>Symbol</th>
          <th>Side</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: IWalletOrder, index: number) => (
          <tr key={index}>
            <th>{order.symbol}</th>
            <th>{order.side}</th>
            <th>{order.quantity}</th>
            <th>{order.price}</th>
            <th>
              <span className={`badge badge-${getBadge(order.status)}`}>{order.status}</span>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
