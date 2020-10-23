import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import React, { FunctionComponent } from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  bottomTitle?: string;
  bottomValue?: string;
  color: string;
}

export const Card: FunctionComponent<CardProps> = ({ icon, title, value, color, bottomTitle, bottomValue }) => {
  return (
    <div className='col-6 col-xl-3'>
      <div className='card card-stats'>
        <div className='card-body'>
          <div className='row'>
            <div className='col'>
              <h5 className='card-title text-uppercase text-muted mb-0'>{title}</h5>
              <span className='h2 font-weight-bold mb-0'>{value}</span>
            </div>
            <div className='col-auto'>
              <div className={`icon icon-shape text-white rounded-circle shadow ${color || 'bg-gradient-info'}`}>{icon}</div>
            </div>
          </div>
          {bottomValue && (
            <p className='mt-3 mb-0 text-sm'>
              <span className='text-success mr-2'>
                <i className='fa fa-arrow-up'></i> {bottomValue}
              </span>
              <span className='text-nowrap'>{bottomTitle}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
