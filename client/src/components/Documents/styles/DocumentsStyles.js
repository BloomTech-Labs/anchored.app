import styled from 'styled-components';

export const DocumentsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DocumentOptionsContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const DocumentsOptions = styled.div`
  border: 1px solid #7344c1;
  border-radius: 5px;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 50px;
  max-width: 300px;
  font-size: 1.1rem;
  cursor: pointer;
  background: ${props => (props.selected ? '#7344c1' : 'white')};
  color: ${props => (props.selected ? 'white' : '#7344c1')};

  @media (max-width: 550px) {
    margin: 10px;
  }
`;

export const AddDocument = styled.a`
  margin: 20px;
  font-size: 50px;
  cursor: pointer;
  text-decoration: none;
  color: #7344c1;
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 40vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
