import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <nav className='sidenav navbar navbar-vertical fixed-left  navbar-expand-xs navbar-light bg-white' id='sidenav-main'>
      <div className='scrollbar-inner'>
        <div className='sidenav-header  align-items-center'>
          <a className='navbar-brand' href='#'>
            <img src={require('../assets/img/brand/blue.png')} className='navbar-brand-img' alt='...' />
          </a>
        </div>
        <div className='navbar-inner'>
          <div className='collapse navbar-collapse' id='sidenav-collapse-main'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink to='/' className='nav-link' exact activeClassName='active'>
                  <i className='ni ni-tv-2 text-primary'></i>
                  <span className='nav-link-text'>Overview</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/margin' className='nav-link' exact activeClassName='active'>
                  <i className='ni ni-tv-2 text-primary'></i>
                  <span className='nav-link-text'>Margin</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/masternodes' className='nav-link' exact activeClassName='active'>
                  <i className='ni ni-tv-2 text-primary'></i>
                  <span className='nav-link-text'>Masternodes</span>
                </NavLink>
              </li>
            </ul>
            <hr className='my-3' />
            <h6 className='navbar-heading p-0 text-muted'>
              <span className='docs-normal'>Account</span>
            </h6>
            <ul className='navbar-nav mb-md-3'>
              <li className='nav-item'>
                <NavLink to='/wallet' className='nav-link' exact activeClassName='active'>
                  <i className='ni ni-tv-2 text-primary'></i>
                  <span className='nav-link-text'>Wallet</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/settings' className='nav-link' exact activeClassName='active'>
                  <i className='ni ni-tv-2 text-primary'></i>
                  <span className='nav-link-text'>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
