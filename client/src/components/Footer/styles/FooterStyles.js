import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid black;
  padding: 30px;
  width: 1026px;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 550px) {
    font-size: 0.7rem;
    flex-direction: column;
  }
`;

export const LeftFoot = styled.div`
  /* width: 30%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CenterFoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 30%; */
`;

export const RightFoot = styled.div`
  /* width: 30%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Copy = styled.p`
  font-size: 0.8rem;
  padding: 15px;
`;

export const Img = styled.img`
  width: 30px;
`;
