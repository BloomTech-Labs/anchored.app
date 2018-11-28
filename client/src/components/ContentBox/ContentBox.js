import React from 'react';
import Auth0 from '../Auth/Auth0/Auth0.js';

import {
  BoxContainer,
  BoxButton,
  H3,
  Copy,
} from './styles/ContentBoxStyles.js';

const auth = new Auth0();

const ContentBox = props => {
  return (
    <BoxContainer>
      <H3>{props.title}</H3>
      <Copy>{props.copyOne}</Copy>
      <Copy>{props.copyTwo}</Copy>
      <Copy>{props.copyThree}</Copy>
      <BoxButton onClick={auth.signUp}>Start Now</BoxButton>
    </BoxContainer>
  );
};

export default ContentBox;
