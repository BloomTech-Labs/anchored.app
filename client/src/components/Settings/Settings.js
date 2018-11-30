import React from 'react';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink.js';
import PasswordReset from './PasswordReset.js';
import { ButtonContainer } from './styles/SettingsStyles.js';

const Settings = () => {
  return (
    <ButtonContainer>
      <PasswordReset />
      <DocusignUnlink />
    </ButtonContainer>
  );
};

export default Settings;
