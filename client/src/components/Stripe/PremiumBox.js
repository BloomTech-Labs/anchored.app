import React from 'react';

import { BoxContainer, H3, Copy } from './styles/BuyBoxStyles.js';
import { Button } from './styles/BuyStyles.js';

const PremiumBox = props => {
  return (
    <BoxContainer>
      <H3>{props.title}</H3>
      <Copy>{props.copyOne}</Copy>
      <Copy>{props.copyTwo}</Copy>
      <Copy>{props.copyThree}</Copy>
      <Button outline color={props.color} onClick={props.onClick}>
        {props.btnDescription}
      </Button>
    </BoxContainer>
  );
};

export default PremiumBox;
