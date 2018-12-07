import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';

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
  max-width: 1026px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 550px) {
    height: 120px;
    padding: 0 15px;
  }
`;

export const Links = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 550px) {
    padding: 0 15px;
    margin-top: 10px;
    margin-right: -20px;
  }
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

export const Credits = styled.div`
  padding: 0 5px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  @media (max-width: 550px) {
    padding: 0;
    justify-content: flex-start;
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
`;

export const UserHeader = styled.div`
  font-weight: bold;
`;
