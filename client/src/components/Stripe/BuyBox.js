import React from 'react';

import { BoxContainer, H3, Copy } from './styles/BuyBoxStyles.js';
import { CheckoutCredit } from './Checkout.js';

const BuyBox = props => {
  return (
    <BoxContainer>
      <H3>{props.title}</H3>
      <Copy>{props.copyOne}</Copy>
      <Copy>{props.copyTwo}</Copy>
      <Copy>{props.copyThree}</Copy>
      <CheckoutCredit
        name={props.name}
        description={props.description}
        amount={props.amount}
        color={props.color}
        onToken={props.onToken}
        btnDescription={props.btnDescription}
      />
    </BoxContainer>
  );
};

export default BuyBox;
