import styled from 'styled-components';

export const BoxContainer = styled.div`
  min-height: 400px;
  min-width: 200px;
  border: 1px solid black;
  margin: 30px;
  margin-bottom: 100px;
  background-color: #e6e8e6;

  @media (max-width: 550px) {
    &:first-child {
      margin-bottom: 2px;
    }
  }
`;

export const H3 = styled.h3`
  font-size: 1.32rem;
  font-weight: bold;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Copy = styled.p`
  font-size: 1.1rem;
  padding: 10px;
`;
