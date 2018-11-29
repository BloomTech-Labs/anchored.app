import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import NavButton from './DashNavBtn.js';
import { NavGod, TopNavBar, Links } from './styles/NavStyles.js';

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
