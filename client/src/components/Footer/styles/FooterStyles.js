import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;
  width: 1026px;
  max-width: 100%;
  margin: 0 auto;
  border-top: 1px solid lightgrey;

  @media (max-width: 550px) {
    font-size: 0.7rem;
    flex-direction: column-reverse;
  }
`;

export const LeftFoot = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column-reverse;
  }
`;

export const CenterFoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 550px) {
    display: none;
  }
`;

export const RightFoot = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const Copy = styled.p`
  font-size: 0.8rem;
  padding: 15px;
`;

export const Img = styled.img`
  width: 30px;
  margin-bottom: 15px;
`;
