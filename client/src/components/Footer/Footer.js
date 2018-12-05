import React from 'react';

import {
  FooterContainer,
  LeftFoot,
  CenterFoot,
  RightFoot,
  Copy,
  Img,
} from './styles/FooterStyles.js';

import Logo from '../../assets/Proofd_3_logoOnly.png';

const Footer = () => {
  return (
    <FooterContainer>
      <LeftFoot>
        <Copy>{'\u00A9'} 2018 Proofd </Copy>
        <Copy>About Us</Copy>
        <Copy>Privacy Policy</Copy>
      </LeftFoot>
      <CenterFoot>
        <Img src={Logo} alt="Proofd Logo" />
      </CenterFoot>
      <RightFoot>
        <Copy>Testimonials</Copy>
        <Copy>Terms & Conditions</Copy>
        <Copy>Careers</Copy>
      </RightFoot>
    </FooterContainer>
  );
};
export default Footer;
