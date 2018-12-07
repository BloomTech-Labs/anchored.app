import React from 'react';
import { EditButton } from '../../Settings/styles/SettingsStyles.js';

class DocusignUnlink extends React.Component {
  render() {
    return (
      <EditButton
        size="lg"
        href={
          process.env.REACT_APP_DOCUSIGN_LOGOUT ||
          'http://localhost:9000/auth/docusign/logout'
        }
      >
        Unlink App
      </EditButton>
    );
  }
}

export default DocusignUnlink;
