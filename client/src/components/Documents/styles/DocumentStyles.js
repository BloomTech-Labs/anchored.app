import styled from 'styled-components';

export const DocumentContainer = styled.div`
  margin: 15px;
  padding: 0 15px;
  max-width: 840px;
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 550px) {
    max-width: 500px;
    width: 100%;
  }
`;

export const DocumentSubject = styled.a`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 15px 15px 15px 40px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  @media (max-width: 550px) {
    font-size: 1.1rem;
  }
`;

export const DocumentProof = styled.div`
  border: 1px solid black;
  min-width: 130px;
  padding: 15px;
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
