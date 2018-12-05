import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

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
        <NavLink to={'/team'} style={{ textDecoration: 'none' }}>
          <Copy>Our Team</Copy>
        </NavLink>

        <NavLink to={'/privacy'} style={{ textDecoration: 'none' }}>
          <Copy>Privacy Policy</Copy>
        </NavLink>
      </LeftFoot>
      <CenterFoot>
        <Img src={Logo} alt="Proofd Logo" />
      </CenterFoot>
      <RightFoot>
        <NavLink to={'/testimonials'} style={{ textDecoration: 'none' }}>
          <Copy>Testimonials</Copy>
        </NavLink>

        <NavLink to={'/terms'} style={{ textDecoration: 'none' }}>
          <Copy>Terms & Conditions</Copy>
        </NavLink>

        <NavLink to={'/careers'} style={{ textDecoration: 'none' }}>
          <Copy>Careers</Copy>
        </NavLink>
      </RightFoot>
    </FooterContainer>
  );
};
export default withRouter(Footer);
