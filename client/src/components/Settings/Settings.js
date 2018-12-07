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
        <SubHeaderWrapper>
          <SubHeader>Email</SubHeader>
        </SubHeaderWrapper>
        <SubSettingsWrapper>
          <InfoWrapper>
            <InfoTextTitle>Logged in as</InfoTextTitle>
            {this.props.user.email}
          </InfoWrapper>
          <PasswordReset />
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
