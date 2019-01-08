import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  DropZoneWrapper,
  DocuSignImg,
  UploadWrapper,
  ImgUploadBtn,
  ImgUploadBtnWrapper,
} from './styles/SettingsStyles.js';
import PhotoIcon from '../../assets/edit-photo-icon.png';
import DocuSignLogo from '../../assets/docusign_logo_standard.png';
import ReactGA from 'react-ga';
ReactGA.pageview('/settings');

class Settings extends Component {
  constructor() {
    super();
    this.state = { file: null };
  }

  // Upload + drag and drop to picture icon
  onDrop = acceptedfile => {
    acceptedfile.forEach(photo => {
      // png + jpg to binary conversion
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        this.setState({ file: fileAsBinaryString });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(photo);
    });
  };

  // Cancel upload
  onCancel = () => {
    this.setState({
      file: null,
    });
  };

  // Submit photo to db
  onSubmit = () => {
    const uploaded_picture = this.state.file;
    this.props.newProfileImage(uploaded_picture);
    this.setState({
      file: null,
    });
  };

  render() {
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
            {this.props.user.email}
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
          <DocusignUnlink history={this.props.history} />
        </SubSettingsWrapper>
        <SubHeaderWrapper>
          {/* Profile Settings */}
          <SubHeader>Profile</SubHeader>
        </SubHeaderWrapper>
        <SubSettingsWrapper>
          <InfoWrapper>
            <InfoTextTitle>Picture</InfoTextTitle>
          </InfoWrapper>

          <DropZoneWrapper
            accept="image/jpeg, image/png"
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
            multiple={false}
            maxSize={60000} // 60KB upload limit
            disableClick
            onDropRejected={() =>
              alert('Accepted file types are .jpg and .png at max size 60KB')
            }
          >
            {({ open }) => (
              <UploadWrapper>
                <EditPictureWrapper>
                  <EditPicture
                    src={this.state.file ? this.state.file : PhotoIcon}
                    onClick={() => open()} // Opens upload files from drive dropdown
                  />
                </EditPictureWrapper>
                {this.state.file !== null ? (
                  <ImgUploadBtnWrapper>
                    <ImgUploadBtn
                      size="sm"
                      color="info"
                      onClick={this.onSubmit}
                    >
                      Upload
                    </ImgUploadBtn>
                    <ImgUploadBtn
                      size="sm"
                      color="danger"
                      onClick={this.onCancel}
                    >
                      Cancel
                    </ImgUploadBtn>
                  </ImgUploadBtnWrapper>
                ) : null}
              </UploadWrapper>
            )}
          </DropZoneWrapper>
        </SubSettingsWrapper>
      </SettingsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    // User Info Data
    user: state.user.user,
  };
};

export default connect(
  mapStateToProps,
  { newProfileImage }
)(Settings);
