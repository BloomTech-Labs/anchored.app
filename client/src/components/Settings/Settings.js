import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink.js';
import PasswordReset from './PasswordReset.js';
import {
  SettingsWrapper,
  SubSettingsWrapper,
  MainHeader,
  SubHeaderWrapper,
  SubHeader,
  InfoWrapper,
  InfoTextTitle,
  EditPicture,
  DropZoneWrapper,
} from './styles/SettingsStyles.js';
import PhotoIcon from '../../assets/edit-photo-icon.png';

class Settings extends Component {
  constructor() {
    super();
    this.state = { files: null };
  }

  onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        this.setState({ files: fileAsBinaryString });
        // do whatever you want with the file content
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      console.log(reader.readAsBinaryString(file));
    });
  };

  onCancel() {
    this.setState({
      files: [],
    });
  }

  render() {
    console.log(this.state);
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
            DocuSign
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

          <DropZoneWrapper
            accept="image/jpeg, image/png"
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
            multiple={false}
            maxSize={500000}
          >
            <EditPicture src={PhotoIcon} />
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

export default connect(mapStateToProps)(Settings);
