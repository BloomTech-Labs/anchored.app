import styled from 'styled-components';
import { Copy } from '../../CTA/styles/CTAStyles.js';

export const DocumentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1010px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  height: 100%;
  padding: 0 5px;
`;

export const Header = styled(DocumentsContainer)`
  flex-direction: row;
  justify-content: flex-start;
  max-width: 1010px;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const DocumentOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #7344c1;
  max-width: 1010px;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
    border-bottom: none;
    align-items: center;
  }
`;

export const DocumentsOptions = styled.div`
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

export const DocumentsHeader = styled.h3`
  max-width: 1010px;
  width: 100%;
  text-align: left;
  font-size: 1.8rem;
  padding: 0 20px;
  margin-top: 20px;

  @media (max-width: 800px) {
    text-align: center;
  }
`;

export const DashContainer = styled(DocumentsContainer)`
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1000px;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  max-width: 1010px;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-evenly;
  height: 180px;
  width: 230px;
  background-color: #e6e8e6;
  margin: 20px;
  border-radius: 5px;
`;

export const AppCopy = styled(Copy)`
  font-size: 1.3rem;
  padding-top: 15px;
`;

export const Small = styled(Copy)`
  font-size: 0.8rem;
`;

export const AddIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  width: 70px;
  height: 70px;
  padding-bottom: 10px;
  background-color: #7344c1;
  border-radius: 50%;
  color: white;

  /* Uncomment when ready to go live with additional apps */
  /* &:hover {
    background-color: #8e44c2;
    cursor: pointer;
  } */
`;

export const Img = styled.img`
  width: 140px;
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 840px;
  width: 100%;
  padding: 0 55px;

  @media (max-width: 550px) {
    flex-direction: column-reverse;
    border-bottom: 1px solid lightgray;
  }
`;

export const TabDescription = styled.h5`
  margin: 20px 0;
`;

export const AddDocumentContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #17a2b8;
  max-width: 210px;
  width: 100%;

  &:hover {
    text-decoration: none;
    color: #7344c1;
  }
`;

export const AddDocument = styled.div`
  margin: 20px 10px;
  font-size: 30px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 40vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
