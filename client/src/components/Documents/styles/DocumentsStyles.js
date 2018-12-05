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
  border-bottom: 1px solid #7344c1;

  @media (max-width: 800px) {
    flex-direction: column;
    border-bottom: none;
  }
`;

export const DocumentsOptions = styled.div`
  // border-bottom: 1px solid #7344c1;
  margin: 40px 30px 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 50px;
  width: 100px;
  font-size: 1.15rem;
  cursor: pointer;
  border-bottom: ${props => (props.selected ? '3px solid #7344c1' : 'none')};
  color: ${props => (props.selected ? '#7344c1' : 'black')};

  @media (max-width: 800px) {
    margin: 10px;
    width: 300px;
    border: 1px solid #7344c1;
    border-radius: 5px;
    background: ${props => (props.selected ? '#7344c1' : 'white')};
    color: ${props => (props.selected ? 'white' : '#7344c1')};
  }
`;

export const DocumentsHeader = styled.h4`
  margin-right: 628px;

  @media (max-width: 800px) {
    margin-right: 0;
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
