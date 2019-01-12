import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

export const NavGod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0.1px;
  position: sticky;
  background-color: white;
  z-index: 1000;
`;

export const TopNavBar = styled.div`
  max-width: 1010px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;

  @media (max-width: 800px) {
    height: 100px;
    padding: 0 15px;
  }
`;

export const Links = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 800px) {
    padding: 0 15px;
    margin-top: 10px;
  }
`;

export const TwitterAlert = styled.div`
  width: 40%;
  height: 70%;
  background-color: yellow;
  border: 1px solid black;
  border-radius: 4px;
  margin-left: 250px;
`;

export const TwitterText = styled.p`
  font-size: 0.7rem;
`;

export const Button = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  border: ${props => props.border};
  border-radius: 7px;
  margin: 10px;

  &:hover {
    background-color: ${props => props.bgColor};
    color: ${props => props.hoverFontColor};
  }
`;

export const DashboardButton = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BuyCreditsButton = styled.div`
  padding: 0 20px;
`;

export const Img = styled.img`
  width: 80px;
`;

export const DropdownCreditsWrapper = styled(DropdownItem)`
  &:hover {
    background: none;
  }
`;

export const Credits = styled.div`
  padding: 0 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  @media (max-width: 800px) {
    padding: 0;
    justify-content: flex-start;
    color: white;

    &:hover {
      background: none;
    }
  }
`;

export const DropdownLink = styled(NavLink)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: none;
  }
`;

export const Logout = styled.div`
  color: black;
`;

export const StyledDropdownItem = styled(DropdownItem)`
  cursor: pointer;
  margin-bottom: 7.5px;
  line-height: 18px;

  &:hover {
    color: white;
    background: #7344c1;

    a {
      color: white;
    }
  }
  @media (max-width: 800px) {
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 5px 24px;

    &:hover {
      color: #bdbdbd;
      background: none;
    }
  }
`;

export const DropdownMenuWrapper = styled(DropdownMenu)`
  @media (max-width: 800px) {
    width: 100vw;
    padding: 10px 15px;
    margin-right: -30px;
    background: #24292e;
  }
`;

export const DropdownDivider = styled(DropdownItem)`
  @media (max-width: 800px) {
    border-top: 1px solid #444d56;
  }
`;

export const DropdownUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserHeader = styled.div`
  font-weight: bold;
  @media (max-width: 800px) {
    padding-left: 20px;
    color: white;
  }
`;

export const ProfilePicWrapper = styled(DropdownToggle)`
  display: flex;
  align-items: center;
  background: none; /* Fixes Firefox background color */

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(115, 68, 193, 0.25);
  }

  @media (max-width: 800px) {
    background: white;
    border: none;
    margin-right: -20px;

    &:hover {
      background: none;
    }
  }
`;

export const ImageCropper = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`;

export const ProfilePic = styled.img`
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
`;

export const Hamburger = styled.div`
  font-size: 30px;
  color: black;
`;
