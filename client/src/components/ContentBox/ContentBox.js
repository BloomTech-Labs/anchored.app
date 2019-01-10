import React from 'react';

import {
  BoxContainer,
  BoxButton,
  H3,
  Copy,
} from './styles/ContentBoxStyles.js';

const ContentBox = props => {
  return (
    <BoxContainer>
      <H3>{props.title}</H3>
      <Copy>{props.copyOne}</Copy>
      <Copy>{props.copyTwo}</Copy>
      <Copy>{props.copyThree}</Copy>
      <BoxButton onClick={props.onClick}>{props.description}</BoxButton>
    </BoxContainer>
  );
};

export default ContentBox;
