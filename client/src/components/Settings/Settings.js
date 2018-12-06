import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink.js';
import PasswordReset from './PasswordReset.js';
import {
  ButtonContainer,
  SettingsWrapper,
  MainHeader,
  SubHeader,
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
        {this.props.user.email}
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
