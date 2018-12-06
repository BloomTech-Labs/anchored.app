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
  cursor: pointer;
  text-decoration: none;
  color: black;

  @media (max-width: 550px) {
    font-size: 1.1rem;
  }
`;

export const DocumentProof = styled.div`
  border: 1px solid #17a2b8;
  color: #17a2b8
  border-radius: 5px;
  min-width: 130px;
  padding: 8px 15px;
  cursor: pointer;

  &:hover {
    background: #17a2b8;
    color: #fff;
  }
`;

export const ProofDocTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 15px 15px 40px;
`;

export const TimestampContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

export const Timestamp = styled.div`
  color: gray;
  padding: 0 5px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
