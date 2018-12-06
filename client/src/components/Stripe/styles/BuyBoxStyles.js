import styled from 'styled-components';

export const BoxContainer = styled.div`
  min-height: 400px;
  min-width: 240px;
  max-width: 240px;
  border: 1px solid black;
  margin: 30px;
  background-color: #e6e8e6;
  border: 1px solid grey;
  border-radius: 5px;

  @media (max-width: 550px) {
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 100px;
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
