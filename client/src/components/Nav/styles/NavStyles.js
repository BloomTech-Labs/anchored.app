import styled from 'styled-components';

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
  /* background-color: #e6e8e6; */

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
  color: ${props => props.color};
  border: ${props => props.border};
  border-radius: 7px;

  &:hover {
    /* font-size: 1.2rem; */
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
  width: 10%;

  @media (max-width: 550px) {
    width: 30%;
  }
`;

export const Credits = styled.div`
  min-width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
