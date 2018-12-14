import React, { Component } from 'react';
import playImg from '../../assets/video_icon.png';
import YouTube from 'react-youtube';

import {
  CtaContainer,
  CtaButton,
  Demo,
  H2,
  Copy,
  Img,
} from './styles/CTAStyles.js';

import { Events, scrollSpy, scroller } from 'react-scroll';
import { Modal } from 'reactstrap';

class CTA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
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
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };
    return (
      <CtaContainer>
        <H2>Get proof. Don't just trust.</H2>
        <Copy>A blockchain enabled verification platform</Copy>
        <CtaButton onClick={this.smoothScroll}>CHECK OUR PRICES</CtaButton>
        <Demo onClick={this.toggle}>
          <Img src={playImg} alt="play icon" width="20%" />
          <Copy>Watch the Demo</Copy>
        </Demo>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <YouTube videoId="3_fG_zLbBeU" onReady={this._onReady} />
        </Modal>
      </CtaContainer>
    );
  }
}

export default CTA;
