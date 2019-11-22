import React, { useState, useEffect } from 'react';
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

const CTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Events.scrollEvent.register('begin', function(to, element) {});
    Events.scrollEvent.register('end', function(to, element) {});
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  // scrolls to <Element name="pricingSheets"> in LPContent.js
  const smoothScroll = () => {
    scroller.scrollTo('pricingSheets', {
      duration: 1500,
      delay: 1,
      smooth: true,
      offset: -180,
    });
  };

  return (
    <CtaContainer>
      <H2>Don't Just Trust. Get Proof.</H2>
      <Copy>A blockchain enabled verification platform</Copy>
      <CtaButton onClick={smoothScroll}>CHECK OUR PRICES</CtaButton>
      <Demo onClick={() => setIsOpen(true)}>
        <Img src={playImg} alt="play icon" width="20%" />
        <Copy>Watch the Promo</Copy>
      </Demo>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="CQi2sfVNWyI"
        onClose={() => setIsOpen(false)}
      />
    </CtaContainer>
  );
};

export default CTA;
