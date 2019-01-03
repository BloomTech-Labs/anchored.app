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
        <NavLink
          to={'/team'}
          style={{ textDecoration: 'none', color: '#7344c1' }}
          activeStyle={{ color: '#20D1C8' }}
        >
          <Copy>Our Team</Copy>
        </NavLink>
      </LeftFoot>
      <CenterFoot>
        <Img src={Logo} alt="Proofd Logo" />
      </CenterFoot>
      <RightFoot>
        <NavLink
          to={'/privacy'}
          style={{ textDecoration: 'none', color: '#7344c1' }}
          activeStyle={{ color: '#20D1C8' }}
        >
          <Copy>Privacy Policy</Copy>
        </NavLink>

        <NavLink
          to={'/terms'}
          style={{ textDecoration: 'none', color: '#7344c1' }}
          activeStyle={{ color: '#20D1C8' }}
        >
          <Copy>Terms & Conditions</Copy>
        </NavLink>
      </RightFoot>
    </FooterContainer>
  );
};
export default withRouter(Footer);
