import styled from 'styled-components';
import { Button } from 'reactstrap';
import DropZone from 'react-dropzone';

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
  align-items: flex-start;
  margin-top: 30px;
  padding-bottom: 50px;
  max-width: 1010px;
`;

export const MainHeader = styled.h3`
  display: flex;
  margin-bottom: 70px;
`;

export const SubHeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #7344c1;
`;

export const SubHeader = styled.h4`
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
  min-width: 240px;
  max-width: 280px;

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

export const EditPicture = styled.img`
  width: 100px;
  // margin-right: 70px;
  opacity: 0.7;
  padding-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export const DocuSignImg = styled.img`
  width: 125px;
`;

export const DropZoneWrapper = styled(DropZone)``;

export const UploadWrapper = styled.div`
display: flex:
align-items: center;
justify-content: center;
`;
