import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Auth0 from '../Auth/Auth0/Auth0.js';
import NavButton from './NavButton.js';
import { NavGod, TopNavBar, Links } from './styles/NavStyles.js';

const auth = new Auth0();

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
