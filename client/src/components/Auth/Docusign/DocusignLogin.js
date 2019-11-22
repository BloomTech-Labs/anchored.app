import React from 'react';
import { AppBtn } from './styles/DocusignLoginStyles.js';

const DocusignLogin = () => {
  if (process.env.REACT_APP_DOCUSIGN) {
    return (
      <div>
        <AppBtn href={process.env.REACT_APP_DOCUSIGN}>Login</AppBtn>
      </div>
    );
  } else {
    return (
      <div>
        <AppBtn href="http://localhost:9000/auth/docusign">Login</AppBtn>
      </div>
    );
  }
};

export default DocusignLogin;
