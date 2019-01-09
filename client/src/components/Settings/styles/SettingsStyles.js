import styled from 'styled-components';
import { Button } from 'reactstrap';

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
  max-width: 1010px;
  height: 100%;
  padding: 0 20px;

  @media (max-width: 550px) {
    justify-content: center;
    align-items: center;
  }
`;

export const SubSettingsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
  padding-bottom: 50px;
  overflow-x: hidden;

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MainHeader = styled.h3`
  display: flex;
  margin-bottom: 70px;
`;

export const SubHeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #7344c1;

  @media (max-width: 550px) {
    justify-content: center;
    width: 100%;
  }
`;

export const SubHeader = styled.h4`
  color: gray;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 550px) {
    padding: 20px;
    align-items: center;
  }
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
    box-shadow: none;
  }
`;

export const ImgUploadBtnWrapper = styled.div`
  display: flex;
`;

export const ImgUploadBtn = styled(Button)`
  margin: 0 10px;
`;

export const EditPictureWrapper = styled.div`
  height: 120px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const EditPicture = styled.img`
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

export const DocuSignImg = styled.img`
  width: 125px;
`;

export const UploadWrapper = styled.div`
display: flex:
justify-content: center;
`;
