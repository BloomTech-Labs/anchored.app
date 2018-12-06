import styled from 'styled-components';

export const BoxContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const BasicDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const PremiumDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 7px;
  background-color: #7344c1;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #8e44c2;
  }
`;
