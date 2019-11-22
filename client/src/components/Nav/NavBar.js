import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth0 from '../Auth/Auth0/Auth0.js';
import NavButton from './NavButton.js';
import {
  NavGod,
  TopNavBar,
  Links,
  Img,
  TwitterAlert,
  TwitterText,
} from './styles/NavStyles.js';
import Logo from '../../assets/Proofd_3.png';

const auth = new Auth0();

const NavBar = () => {
  return (
    <NavGod>
      <TopNavBar>
        <NavLink to={'/'}>
          <Img src={Logo} alt="Proofd Logo" />
        </NavLink>
        {/* Uncomment the TwitterAlert section if needed due to high traffic */}
        {/* <TwitterAlert>
            <TwitterText>
              Someone with <em>a lot</em> of Twitter followers tweeted about us,
              and we're experiencing abnormally high traffic. Thanks for your
              patience!
            </TwitterText>
          </TwitterAlert> */}
        <Links>
          <NavLink
            to={`/`}
            onClick={auth.signUp}
            style={{ textDecoration: 'none' }}
          >
            <NavButton
              name="Sign Up"
              color="#7344c1"
              bgColor="#7344c1"
              border="1px solid #7344c1"
              hoverFontColor="white"
            />
          </NavLink>
          <NavLink
            to={`/`}
            onClick={auth.login}
            style={{ textDecoration: 'none' }}
          >
            <NavButton
              name="Log In"
              color="black"
              hoverFontColor="white"
              bgColor="#7344c1"
            />
          </NavLink>
        </Links>
      </TopNavBar>
    </NavGod>
  );
};

export default NavBar;
