import React from 'react';
import { AppBtn } from './styles/DocusignLoginStyles.js';

class DocusignLogin extends React.Component {
  render() {
    if (process.env.REACT_APP_DOCUSIGN) {
      return (
        <div>
          <AppBtn href={process.env.REACT_APP_DOCUSIGN}>DocuSign Login</AppBtn>
        </div>
      );
    } else {
      return (
        <div>
          <AppBtn href="http://localhost:9000/auth/docusign">
            Docusign Login
          </AppBtn>
        </div>
      );
    }
  }
}

export default DocusignLogin;
