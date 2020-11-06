import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { getMarginBalance, getSpotBalance, IWalletAsset } from '../store/actions/walletActions';

export const Wallet = () => {
  const spotBalances = useSelector((state: any) => getSpotBalance(state.wallet));
  const marginBalances = useSelector((state: any) => getMarginBalance(state.wallet));

  return (
    <div id='wallet'>
      <Header>
        <h1 className='h1 text-white col-12 mb-3'>Wallet</h1>
      </Header>
      <Container>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-header bg-transparent'>
                <div className='row align-items-center'>
                  <div className='col'>
                    {/* <h6 className='text-light text-uppercase ls-1 mb-1'>Spot wallet</h6> */}
                    <h5 className='h3 mb-0'>Spot wallet</h5>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Asset</th>
                      <th>Quantity</th>
                      <th>Free</th>
                      <th>Locked</th>
                      <th className='text-right'>Estimation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spotBalances.map((balance: IWalletAsset, index: number) => (
                      <tr key={index}>
                        <td>{balance.symbol}</td>
                        <td>{balance.total}</td>
                        <td>{balance.free}</td>
                        <td>{balance.locked}</td>
                        <td className='text-right'>{balance.estimation}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-header bg-transparent'>
                <div className='row align-items-center'>
                  <div className='col'>
                    {/* <h6 className='text-light text-uppercase ls-1 mb-1'>Spot wallet</h6> */}
                    <h5 className='h3 mb-0'>Margin wallet</h5>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <table className='table'>
                  <thead className='thead-light'>
                    <tr>
                      <th>Asset</th>
                      <th>Quantity</th>
                      <th>Free</th>
                      <th>Locked</th>
                      <th className='text-right'>Estimation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marginBalances.map((balance: IWalletAsset, index: number) => (
                      <tr key={index}>
                        <td>{balance.symbol}</td>
                        <td>{balance.total}</td>
                        <td>{balance.free}</td>
                        <td>{balance.locked}</td>
                        <td className='text-right'>{balance.estimation}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
