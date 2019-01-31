import React, { Component } from 'react';
import playImg from '../../assets/video_icon.png';
import ModalVideo from 'react-modal-video';
import '../../../node_modules/react-modal-video/css/modal-video.min.css';

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
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

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
        <H2>Don't Just Trust. Get Anchored.</H2>
        <Copy>A blockchain enabled verification platform</Copy>
        <CtaButton onClick={this.smoothScroll}>CHECK OUR PRICES</CtaButton>
        <Demo onClick={this.openModal}>
          <Img src={playImg} alt="play icon" width="20%" />
          <Copy>Watch the Promo</Copy>
        </Demo>
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId="CQi2sfVNWyI"
          onClose={() => this.setState({ isOpen: false })}
        />
      </CtaContainer>
    );
  }
}

export default CTA;
