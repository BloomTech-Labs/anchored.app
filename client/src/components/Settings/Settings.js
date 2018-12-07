import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink.js';
import PasswordReset from './PasswordReset.js';
import {
  ButtonContainer,
  SettingsWrapper,
  SubSettingsWrapper,
  MainHeader,
  SubHeader,
  InfoWrapper,
  InfoTextTitle,
  EditButton,
} from './styles/SettingsStyles.js';

class Settings extends Component {
  render() {
    console.log(this.props.user);
    return (
      // <ButtonContainer>
      //   <PasswordReset />
      //   <DocusignUnlink />
      // </ButtonContainer>
      <SettingsWrapper>
        <MainHeader>Settings</MainHeader>
        <SubHeader>Email</SubHeader>
        <SubSettingsWrapper>
          <InfoWrapper>
            <InfoTextTitle>Your Current Email</InfoTextTitle>
            {this.props.user.email}
          </InfoWrapper>
          <EditButton size="lg">Edit Password</EditButton>
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
