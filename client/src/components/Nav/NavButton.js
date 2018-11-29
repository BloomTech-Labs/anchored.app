import React from 'react';
import { Button } from './styles/NavStyles.js';

const NavButton = props => {
  let btnName = props.name;

  return <Button>{btnName}</Button>;
};

export default NavButton;
