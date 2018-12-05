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
  z-index: 1;
`;

export const TopNavBar = styled.div`
  max-width: 1026px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 550px) {
    height: 140px;
    flex-direction: column;
  }
`;

export const Links = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export const Button = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7344c1;

  &:hover {
    font-size: 1.2rem;
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
  width: 10%;

  @media (max-width: 550px) {
    width: 30%;
  }
`;

export const DropdownWrapper = styled.div`
  height: 152px;
`;

export const Credits = styled.div`
  min-width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const DropdownLink = styled(NavLink)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: none;
  }
`;

export const UserHeader = styled.h5`
  color: teal;
`;

export const StyledDropdownItem = styled(DropdownItem)`
  cursor: pointer;
<<<<<<< HEAD
  margin-bottom: 7.5px;
  line-height: 18px;
=======
  margin-bottom: ${props => (props.primary ? '7.5px' : '0')};

>>>>>>> Added wrapper to dropdown menu with height
  &:hover {
    color: white;
    background: #7344c1;
    a {
      color: white;
    }
  }
`;

export const UserHeader = styled.h4`
  font-size: 18px;
  color: teal;
  font-weight: bold;
  margin-bottom: 8px;
`;
