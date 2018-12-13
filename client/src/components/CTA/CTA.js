import React, { Component } from 'react';
import playImg from '../../assets/video_icon.png';

import {
  CtaContainer,
  CtaButton,
  Demo,
  H2,
  Copy,
  Img,
} from './styles/CTAStyles.js';

import { Events, scrollSpy, scroller } from 'react-scroll';

class CTA extends Component {
  componentDidMount() {
    Events.scrollEvent.register('begin', function(to, element) {});

    Events.scrollEvent.register('end', function(to, element) {});

    scrollSpy.update();
  }

  // scrolls to <Element name="pricingSheets"> in LPContent.js
  smoothScroll() {
    scroller.scrollTo('pricingSheets', {
      duration: 1500,
      delay: 1,
      smooth: true,
      offset: -180,
    });
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <CtaContainer>
        <H2>Get proof. Don't just trust.</H2>
        <Copy>A blockchain enabled verification platform</Copy>
        <CtaButton onClick={this.smoothScroll}>CHECK OUR PRICES</CtaButton>
        <Demo>
          <Img src={playImg} alt="play icon" width="20%" />
          <Copy>Watch the Demo</Copy>
        </Demo>
      </CtaContainer>
    );
  }
}

export default CTA;
