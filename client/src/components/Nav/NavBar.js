import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Auth0 from '../Auth/Auth0/Auth0.js';
import NavButton from './NavButton.js';

const auth = new Auth0();

const NavGod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopNavBar = styled.div`
  max-width: 1026px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Links = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

class NavBar extends Component {
  render() {
    return (
      <NavGod>
        <TopNavBar>
          <p>Proof'd Logo</p>
          <Links>
            <NavLink to={`/`} style={{ textDecoration: 'none' }}>
              <NavButton name="Home" />
            </NavLink>
            <NavLink to={`/faq`} style={{ textDecoration: 'none' }}>
              <NavButton name="FAQ" />
            </NavLink>
            <NavLink
              to={`/`}
              onClick={auth.signUp}
              style={{ textDecoration: 'none' }}
            >
              <NavButton name="Sign Up" />
            </NavLink>
            <NavLink
              to={`/`}
              onClick={auth.login}
              style={{ textDecoration: 'none' }}
            >
              <NavButton name="Log In" />
            </NavLink>
          </Links>
        </TopNavBar>
      </NavGod>
    );
  }
}

export default withRouter(NavBar);
