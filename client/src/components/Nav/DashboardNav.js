import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import NavButton from './DashNavBtn.js';

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
  handleLogout = () => {
    axios
      .get(
        process.env.REACT_APP_LOGOUT_URL ||
          'http://localhost:9000/auth/auth0/logout'
      )
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <NavGod>
        <TopNavBar>
          <p>Proof'd Logo</p>
          <Links>
            <NavLink
              exact
              to={`/`}
              style={{ textDecoration: 'none' }}
              activeStyle={{
                color: 'orange',
              }}
            >
              <NavButton name="Documents" />
            </NavLink>
            <NavLink
              to={`/billing`}
              style={{ textDecoration: 'none' }}
              activeStyle={{
                color: 'orange',
              }}
            >
              <NavButton name="Billing" />
            </NavLink>
            <NavLink
              to={`/settings`}
              style={{ textDecoration: 'none' }}
              activeStyle={{
                color: 'orange',
              }}
            >
              <NavButton name="Settings" />
            </NavLink>
            <NavLink
              to={`/`}
              onClick={this.handleLogout}
              style={{ textDecoration: 'none' }}
            >
              <NavButton name="Log Out" />
            </NavLink>
          </Links>
        </TopNavBar>
      </NavGod>
    );
  }
}

export default withRouter(NavBar);
