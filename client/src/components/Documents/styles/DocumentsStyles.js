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
<<<<<<< HEAD
  border-bottom: 1px solid #7344c1;

  @media (max-width: 800px) {
    flex-direction: column;
    border-bottom: none;
=======

  @media (max-width: 550px) {
    flex-direction: column;
>>>>>>> 728c0f09ab98f27c0ba7ab6b3baa3222cc7914f1
  }
`;

export const DocumentsOptions = styled.div`
<<<<<<< HEAD
  // border-bottom: 1px solid #7344c1;
  margin: 40px 30px 0 30px;
=======
  border: 1px solid #7344c1;
  border-radius: 5px;
  margin: 30px;
>>>>>>> 728c0f09ab98f27c0ba7ab6b3baa3222cc7914f1
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 50px;
  width: 100px;
  font-size: 1.15rem;
  cursor: pointer;
<<<<<<< HEAD
  border-bottom: ${props => (props.selected ? '3px solid #7344c1' : 'none')};
  color: ${props => (props.selected ? '#7344c1' : 'black')};

  @media (max-width: 800px) {
    margin: 10px;
    width: 300px;
    border: 1px solid #7344c1;
    border-radius: 5px;
    background: ${props => (props.selected ? '#7344c1' : 'white')};
    color: ${props => (props.selected ? 'white' : '#7344c1')};
=======
  background: ${props => (props.selected ? '#7344c1' : 'white')};
  color: ${props => (props.selected ? 'white' : '#7344c1')};

  @media (max-width: 550px) {
    margin: 10px;
>>>>>>> 728c0f09ab98f27c0ba7ab6b3baa3222cc7914f1
  }
`;

export const DocumentsHeader = styled.div`
  max-width: 840px;
  width: 100%;
  text-align: left;
  font-size: 1.8rem;
  padding: 0 15px;

  @media (max-width: 800px) {
    text-align: center;
  }
`;
export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 840px;
  width: 100%;
  padding: 0 15px;
`;

export const TabDescription = styled.h5`
  margin: 20px 0;
`;

export const AddDocumentContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
<<<<<<< HEAD
  color: #17a2b8;

  &:hover {
    text-decoration: none;
    color: #7344c1;
  }
`;

export const AddDocument = styled.a`
  margin: 20px 10px;
  font-size: 30px;
=======
  color: #7344c1;
>>>>>>> 728c0f09ab98f27c0ba7ab6b3baa3222cc7914f1
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 40vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
