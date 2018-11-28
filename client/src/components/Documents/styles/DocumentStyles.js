import styled from 'styled-components';

export const DocumentContainer = styled.div`
  margin: 15px;
  width: 840px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DocumentSubject = styled.a`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 15px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const DocumentProof = styled.div`
  border: 1px solid black;
  min-width: 130px;
  padding: 15px;
  cursor: pointer;
`;
