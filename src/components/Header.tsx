import React, { FunctionComponent } from 'react';

interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  return (
    <div className='header bg-primary pb-7 pt-4'>
      <div className='container-fluid'>
        <div className='header-body'>
          <div className='row py-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};
