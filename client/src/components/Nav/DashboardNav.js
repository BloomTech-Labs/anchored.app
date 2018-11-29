import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import NavButton from './DashNavBtn.js';
import { NavGod, TopNavBar, Links } from './styles/NavStyles.js';

// styles for profile image
const ProfileImage = {
  height: '50px',
  borderRadius: '25px',
};

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
            <img
              style={ProfileImage}
              src={this.props.user.picture}
              alt="user profile thumbnail"
            />
          </Links>
        </TopNavBar>
      </NavGod>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    fetching: state.user.retrieving,
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
