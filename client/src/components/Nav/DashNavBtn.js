import React from 'react';
import { DashboardButton } from './styles/NavStyles.js';

const DashNavBtn = props => {
  let btnName = props.name;

  return <DashboardButton>{btnName}</DashboardButton>;
};

export default DashNavBtn;
