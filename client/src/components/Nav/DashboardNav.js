import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import MediaQuery from 'react-responsive';

import {
  NavGod,
  TopNavBar,
  Links,
  BuyCreditsButton,
  Img,
  Credits,
  DropdownLink,
  StyledDropdownItem,
  DropdownMenuWrapper,
  UserHeader,
  Logout,
  ImageCropper,
  ProfilePic,
  ProfilePicWrapper,
} from './styles/NavStyles.js';
import { Dropdown, DropdownItem, Button } from 'reactstrap';
import Logo from '../../assets/Proofd_3.png';

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
        window.location.replace('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    const picture = this.props.user.uploaded_picture
      ? this.props.user.uploaded_picture
      : this.props.user.picture;

    let src = picture;
    if (picture.type) {
      const data = Buffer.from(picture.data).toString();
      src = data;
    }

    return (
      <NavGod>
        <TopNavBar>
          <NavLink exact to={`/`}>
            <Img src={Logo} alt="Proofd Logo" />
          </NavLink>
          <Links>
            <MediaQuery minWidth={550}>
              <Credits>Credits: {this.props.user.credits}</Credits>
              <NavLink exact to={`/buy`} style={{ textDecoration: 'none' }}>
                <BuyCreditsButton>
                  <Button color="info" size="large">
                    Buy Credits
                  </Button>
                </BuyCreditsButton>
              </NavLink>
            </MediaQuery>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <ProfilePicWrapper size="sm" caret color="none">
                <ImageCropper>
                  <ProfilePic src={src} />
                </ImageCropper>
              </ProfilePicWrapper>
              <DropdownMenuWrapper right>
                <DropdownItem disabled>Logged in as</DropdownItem>
                <DropdownItem disabled>
                  <UserHeader>{this.props.user.username}</UserHeader>
                </DropdownItem>
                <DropdownItem divider />
                <MediaQuery maxWidth={550}>
                  <DropdownItem>
                    <Credits>Credits: {this.props.user.credits}</Credits>
                  </DropdownItem>
                  <MediaQuery maxWidth={550}>
                    <DropdownItem divider />
                  </MediaQuery>
                  <DropdownLink to={`/buy`}>
                    <StyledDropdownItem>Buy Credits</StyledDropdownItem>
                  </DropdownLink>
                  <MediaQuery maxWidth={550}>
                    <DropdownItem divider />
                  </MediaQuery>
                </MediaQuery>
                <DropdownLink exact to={`/`}>
                  <StyledDropdownItem>Dashboard</StyledDropdownItem>
                </DropdownLink>
                <MediaQuery maxWidth={550}>
                  <DropdownItem divider />
                </MediaQuery>
                <DropdownLink to={`/account`}>
                  <StyledDropdownItem>Account</StyledDropdownItem>
                </DropdownLink>
                <MediaQuery maxWidth={550}>
                  <DropdownItem divider />
                </MediaQuery>
                <DropdownLink to={`/settings`}>
                  <StyledDropdownItem>Settings</StyledDropdownItem>
                </DropdownLink>
                <MediaQuery maxWidth={550}>
                  <DropdownItem divider />
                </MediaQuery>
                <Logout onClick={this.handleLogout}>
                  <StyledDropdownItem>Log out</StyledDropdownItem>
                </Logout>
              </DropdownMenuWrapper>
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
