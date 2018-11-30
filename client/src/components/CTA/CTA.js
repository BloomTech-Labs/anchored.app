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

import {
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';

class CTA extends Component {
  componentDidMount() {
    Events.scrollEvent.register('begin', function(to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log('end', arguments);
    });

    scrollSpy.update();
  }

  // scrolls to <Element name="pricingSheets"> in LPContent.js
  smoothScroll() {
    scroller.scrollTo('pricingSheets', {
      duration: 1500,
      delay: 1,
      smooth: true,
      offset: -150,
    });
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <CtaContainer>
        <H2>Get proof, don't just trust</H2>
        <Copy>Blockchain enabled verification platform</Copy>
        <CtaButton onClick={this.smoothScroll}>CHECK OUR PRICES</CtaButton>
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
