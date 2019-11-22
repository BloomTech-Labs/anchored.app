import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MediaQuery from 'react-responsive';

import {
  NavGod,
  TopNavBar,
  Links,
  BuyCreditsButton,
  Img,
  Credits,
  DropdownCreditsWrapper,
  DropdownLink,
  StyledDropdownItem,
  DropdownMenuWrapper,
  DropdownDivider,
  DropdownUserWrapper,
  Hamburger,
  UserHeader,
  Logout,
  ImageCropper,
  ProfilePic,
  ProfilePicWrapper,
  TwitterAlert,
  TwitterText,
} from './styles/NavStyles.js';
import { Dropdown, DropdownItem, Button } from 'reactstrap';
import Logo from '../../assets/Proofd_3.png';

const NavBar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const user = useSelector(state => state.user.user);

  const toggle = () => setDropDownOpen(!dropDownOpen);

  const handleLogout = () => {
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

  // User uploaded image or social media default
  const picture = user.uploaded_picture ? user.uploaded_picture : user.picture;

  // Conversion for user uploaded image
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
        {/* Uncomment the TwitterAlert section if needed due to high traffic */}
        {/* <TwitterAlert>
            <TwitterText>
              Someone with <em>a lot</em> of Twitter followers tweeted about us,
              and we're experiencing abnormally high traffic. Thanks for your
              patience!
            </TwitterText>
          </TwitterAlert> */}
        {/* {*** Links ***} */}
        <Links>
          <MediaQuery minWidth={801}>
            <Credits>Credits: {user.credits}</Credits>
            <NavLink exact to={`/buy`} style={{ textDecoration: 'none' }}>
              <BuyCreditsButton>
                <Button color="info" size="large">
                  Buy Credits
                </Button>
              </BuyCreditsButton>
            </NavLink>
          </MediaQuery>
          {/* {*** Dropdown ***} */}
          <Dropdown isOpen={dropDownOpen} toggle={toggle} inNavbar={true}>
            {/* {*** Thumbnail with Carrot ***} */}
            <MediaQuery minWidth={801}>
              <ProfilePicWrapper size="sm" caret color="none">
                <ImageCropper>
                  <ProfilePic src={src} />
                </ImageCropper>
              </ProfilePicWrapper>
            </MediaQuery>
            {/* {*** Hamburger ***} */}
            <MediaQuery maxWidth={800}>
              <ProfilePicWrapper size="lg">
                <Hamburger className="fas fa-bars" />
              </ProfilePicWrapper>
            </MediaQuery>
            {/* {*** Dropdown Menu ***} */}
            <DropdownMenuWrapper right>
              <DropdownItem disabled>
                {/* { *** Displays 'Logged in as' text ***} */}
                <MediaQuery minWidth={801}>Logged in as</MediaQuery>
                {/* {*** Displays user thumbnail and username ***} */}
                <MediaQuery maxWidth={800}>
                  <DropdownUserWrapper>
                    <ImageCropper>
                      <ProfilePic src={src} />
                    </ImageCropper>
                    <UserHeader>{user.username}</UserHeader>
                  </DropdownUserWrapper>
                </MediaQuery>
                {/* {*** Displays username desktop view ***} */}
                <MediaQuery minWidth={801}>
                  <UserHeader>{user.username}</UserHeader>
                </MediaQuery>
              </DropdownItem>
              <DropdownDivider divider />
              <MediaQuery maxWidth={800}>
                <DropdownCreditsWrapper>
                  <Credits>Credits: {user.credits}</Credits>
                </DropdownCreditsWrapper>
                <MediaQuery maxWidth={800}>
                  <DropdownDivider divider />
                </MediaQuery>
                <DropdownLink to={`/buy`}>
                  <StyledDropdownItem>Buy Credits</StyledDropdownItem>
                </DropdownLink>
                <MediaQuery maxWidth={800}>
                  <DropdownDivider divider />
                </MediaQuery>
              </MediaQuery>
              <DropdownLink exact to={`/`}>
                <StyledDropdownItem>Dashboard</StyledDropdownItem>
              </DropdownLink>
              <MediaQuery maxWidth={800}>
                <DropdownDivider divider />{' '}
              </MediaQuery>
              <DropdownLink to={`/account`}>
                <StyledDropdownItem>Account</StyledDropdownItem>
              </DropdownLink>
              <MediaQuery maxWidth={800}>
                <DropdownDivider divider />{' '}
              </MediaQuery>
              <DropdownLink to={`/settings`}>
                <StyledDropdownItem>Settings</StyledDropdownItem>
              </DropdownLink>
              <MediaQuery maxWidth={800}>
                <DropdownDivider divider />{' '}
              </MediaQuery>
              <Logout onClick={handleLogout}>
                <StyledDropdownItem>Log out</StyledDropdownItem>
              </Logout>
            </DropdownMenuWrapper>
          </Dropdown>
        </Links>
      </TopNavBar>
    </NavGod>
  );
};

export default NavBar;
