import React, { Fragment } from 'react';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink.js';
import PasswordReset from './PasswordReset.js';

const Settings = () => {
  return (
    <Fragment>
      <PasswordReset />
      <DocusignUnlink />
    </Fragment>
  );
};

export default Settings;
