import styled from 'styled-components';
import { Button } from 'reactstrap';

export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`;

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 1010px;
  height: 100%;
`;

export const SubSettingsWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 1010px;
`;

export const MainHeader = styled.h3`
  display: flex;
  margin-bottom: 50px;
`;

export const SubHeader = styled.h4`
  display: flex;
  margin-bottom: 10px;
  color: gray;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 1010px;
`;

export const InfoTextTitle = styled.h5`
  color: gray;
`;

export const EditButton = styled(Button)`
  background: white;
  border-color: #7344c1;
  color: #7344c1;

  &:hover {
    background: #7344c1;
    border-color: #7344c1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(115, 68, 193, 0.5),
      0 0 0 1.5px rgba(115, 68, 193, 0.5);
  }
`;
