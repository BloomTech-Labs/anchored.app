import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink.js';
import PasswordReset from './PasswordReset.js';
import { newProfileImage } from '../../actions/user.js';
import {
  SettingsWrapper,
  SubSettingsWrapper,
  MainHeader,
  SubHeaderWrapper,
  SubHeader,
  InfoWrapper,
  InfoTextTitle,
  EditPicture,
  EditPictureWrapper,
  DocuSignImg,
  UploadWrapper,
  ImgUploadBtn,
  ImgUploadBtnWrapper,
} from './styles/SettingsStyles.js';
import PhotoIcon from '../../assets/edit-photo-icon.png';
import DocuSignLogo from '../../assets/docusign_logo_standard.png';
import Dropzone from 'react-dropzone';
import ReactGA from 'react-ga';

const Settings = () => {
  const [file, setFile] = useState(null);

  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.pageview('/settings');
  }, []);

  // Upload + drag and drop to picture icon
  const onDrop = acceptedfile => {
    acceptedfile.forEach(photo => {
      // png + jpg to binary conversion
      const reader = new FileReader();
      reader.onload = () => setFile(reader.result);
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(photo);
    });
  };

  // Cancel upload
  const onCancel = () => setFile(null);

  // Submit photo to db
  const onSubmit = () => {
    dispatch(newProfileImage(file));
    setFile(null);
  };

  return (
    <SettingsWrapper>
      {/* // Settings Header */}
      <MainHeader>Settings</MainHeader>
      <SubHeaderWrapper>
        {/* Email Settings */}
        <SubHeader>Email</SubHeader>
      </SubHeaderWrapper>
      <SubSettingsWrapper>
        <InfoWrapper>
          <InfoTextTitle>Logged in as</InfoTextTitle>
          {user.email}
        </InfoWrapper>
        <PasswordReset />
      </SubSettingsWrapper>
      <SubHeaderWrapper>
        {/* App Settings */}
        <SubHeader>Apps</SubHeader>
      </SubHeaderWrapper>
      <SubSettingsWrapper>
        <InfoWrapper>
          <InfoTextTitle>Connected</InfoTextTitle>
          {/* TODO: Make this field dynamic when we add more apps */}
          <DocuSignImg src={DocuSignLogo} alt="DocuSign logo" />
        </InfoWrapper>
        <DocusignUnlink />
      </SubSettingsWrapper>
      <SubHeaderWrapper>
        {/* Profile Settings */}
        <SubHeader>Profile</SubHeader>
      </SubHeaderWrapper>
      <SubSettingsWrapper>
        <InfoWrapper>
          <InfoTextTitle>Picture</InfoTextTitle>
        </InfoWrapper>

        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={onDrop}
          multiple={false}
          maxSize={60000} // 60KB upload limit
          onDropRejected={() =>
            alert('Accepted file types are .jpg and .png at max size 60KB')
          }
        >
          {({ getRootProps, getInputProps }) => (
            <UploadWrapper>
              <EditPictureWrapper {...getRootProps()} tabIndex={-1}>
                <input {...getInputProps()} />
                <EditPicture src={file ? file : PhotoIcon} />
              </EditPictureWrapper>
              {file !== null ? (
                <ImgUploadBtnWrapper>
                  <ImgUploadBtn size="sm" color="info" onClick={onSubmit}>
                    Upload
                  </ImgUploadBtn>
                  <ImgUploadBtn size="sm" color="danger" onClick={onCancel}>
                    Cancel
                  </ImgUploadBtn>
                </ImgUploadBtnWrapper>
              ) : null}
            </UploadWrapper>
          )}
        </Dropzone>
      </SubSettingsWrapper>
    </SettingsWrapper>
  );
};

export default Settings;
