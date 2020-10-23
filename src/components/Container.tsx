import { AnyTxtRecord } from 'dns';
import React, { FunctionComponent } from 'react';

interface ContainerProps {}

export const Container: FunctionComponent<ContainerProps> = ({ children }) => {
  return <div className='container-fluid mt--6'>{children}</div>;
};
