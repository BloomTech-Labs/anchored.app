import React from 'react';
import { Button } from './styles/NavStyles.js';

const NavButton = props => {
  let btnName = props.name;
  let color = props.color;
  let bgColor = props.bgColor;
  let border = props.border;
  let hoverFontColor = props.hoverFontColor;

  return (
    <Button
      color={color}
      bgColor={bgColor}
      border={border}
      hoverFontColor={hoverFontColor}
    >
      {btnName}
    </Button>
  );
};

export default NavButton;
