import styled from 'styled-components';

export const DocumentsContainer = styled.div`
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
