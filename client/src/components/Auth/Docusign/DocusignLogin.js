import React from 'react';

class DocusignLogin extends React.Component {
  render() {
    if (process.env.REACT_APP_DOCUSIGN) {
      return (
        <div>
          <a href={process.env.REACT_APP_DOCUSIGN}>DocuSign Login</a>
        </div>
      );
    } else {
      return (
        <div>
          <a href="https://cryptic-eyrie-27950.herokuapp.com/auth/docusign">
            Docusign Login
          </a>
        </div>
      );
    }
  }
}

export default DocusignLogin;
