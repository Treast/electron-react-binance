import React from 'react';

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
                <a className='nav-link active' href='examples/dashboard.html'>
                  <i className='ni ni-tv-2 text-primary'></i>
                  <span className='nav-link-text'>Dashboard</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/icons.html'>
                  <i className='ni ni-planet text-orange'></i>
                  <span className='nav-link-text'>Icons</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/map.html'>
                  <i className='ni ni-pin-3 text-primary'></i>
                  <span className='nav-link-text'>Google</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/profile.html'>
                  <i className='ni ni-single-02 text-yellow'></i>
                  <span className='nav-link-text'>Profile</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/tables.html'>
                  <i className='ni ni-bullet-list-67 text-default'></i>
                  <span className='nav-link-text'>Tables</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/login.html'>
                  <i className='ni ni-key-25 text-info'></i>
                  <span className='nav-link-text'>Login</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/register.html'>
                  <i className='ni ni-circle-08 text-pink'></i>
                  <span className='nav-link-text'>Register</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='examples/upgrade.html'>
                  <i className='ni ni-send text-dark'></i>
                  <span className='nav-link-text'>Upgrade</span>
                </a>
              </li>
            </ul>
            <hr className='my-3' />
            <h6 className='navbar-heading p-0 text-muted'>
              <span className='docs-normal'>Documentation</span>
            </h6>
            <ul className='navbar-nav mb-md-3'>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='https://demos.creative-tim.com/argon-dashboard/docs/getting-started/overview.html'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='ni ni-spaceship'></i>
                  <span className='nav-link-text'>Getting started</span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='https://demos.creative-tim.com/argon-dashboard/docs/foundation/colors.html'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='ni ni-palette'></i>
                  <span className='nav-link-text'>Foundation</span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='https://demos.creative-tim.com/argon-dashboard/docs/components/alerts.html'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='ni ni-ui-04'></i>
                  <span className='nav-link-text'>Components</span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='https://demos.creative-tim.com/argon-dashboard/docs/plugins/charts.html'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='ni ni-chart-pie-35'></i>
                  <span className='nav-link-text'>Plugins</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link active active-pro' href='examples/upgrade.html'>
                  <i className='ni ni-send text-dark'></i>
                  <span className='nav-link-text'>Upgrade to PRO</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
