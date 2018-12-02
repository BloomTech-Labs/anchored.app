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
`;

export const DocumentsOptions = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 50px;
  max-width: 300px;
  font-size: 1.1rem;
  cursor: pointer;
  background: ${props => (props.selected ? 'black' : 'white')};
  color: ${props => (props.selected ? 'white' : 'black')};
`;

export const AddDocument = styled.a`
  margin: 20px;
  font-size: 50px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 40vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
