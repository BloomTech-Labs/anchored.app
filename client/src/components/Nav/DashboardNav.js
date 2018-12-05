import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import NavButton from './DashNavBtn.js';
import {
  NavGod,
  TopNavBar,
  Links,
  BuyCreditsButton,
  Img,
  Credits,
  DropdownLink,
  StyledDropdownItem,
  UserHeader,
  DropdownWrapper,
} from './styles/NavStyles.js';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import Logo from '../../assets/Proofd_3.png';

// styles for profile image
const ProfileImage = {
  height: '50px',
  borderRadius: '25px',
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

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
          <Img src={Logo} alt="Proofd Logo" />
          <Links>
            <Credits>Credits: {this.props.user.credits}</Credits>
            <NavLink
              exact
              to={`/buy`}
              style={{ textDecoration: 'none' }}
              activeStyle={{
                color: 'orange',
              }}
            >
              <BuyCreditsButton>
                <Button color="info" size="large">
                  Buy Credits
                </Button>
              </BuyCreditsButton>
            </NavLink>
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
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle size="sm" caret color="none">
                <img
                  style={ProfileImage}
                  src={this.props.user.picture}
                  alt="user profile thumbnail"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownWrapper>
                  <DropdownItem disabled>Logged in as</DropdownItem>
                  <DropdownItem disabled>
                    <UserHeader>{this.props.user.username}</UserHeader>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownLink to={`/account`}>
                    <StyledDropdownItem primary>Account</StyledDropdownItem>
                  </DropdownLink>
                  <DropdownLink to={`/settings`}>
                    <StyledDropdownItem primary>Settings</StyledDropdownItem>
                  </DropdownLink>
                  <DropdownLink to={`/`} onClick={this.handleLogout}>
                    <StyledDropdownItem primary>Log out</StyledDropdownItem>
                  </DropdownLink>
                </DropdownWrapper>
              </DropdownMenu>
            </Dropdown>
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
