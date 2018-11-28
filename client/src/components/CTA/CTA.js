import React, { Component } from 'react';
import playImg from '../../assets/play-circle.svg';

import {
  CtaContainer,
  CtaButton,
  Demo,
  OurPatrons,
  Logos,
  H2,
  H3,
  Copy,
  Img,
  Friends,
} from './styles/CTAStyles.js';

class CTA extends Component {
  render() {
    return (
      <CtaContainer>
        <H2>Get proof, not just trust</H2>
        <Copy>Blockchain enabled verification platform</Copy>
        <CtaButton>CHECK OUR PRICES</CtaButton>
        <Demo>
          <Img src={playImg} alt="play icon" width="20%" />
          <Copy>Watch the Demo</Copy>
        </Demo>
        <OurPatrons>
          <H3>Used By Our Friends At:</H3>
          <Logos>
            <Friends />
            <Friends />
            <Friends />
            <Friends />
            <Friends />
          </Logos>
        </OurPatrons>
      </CtaContainer>
    );
  }
}

export default CTA;
