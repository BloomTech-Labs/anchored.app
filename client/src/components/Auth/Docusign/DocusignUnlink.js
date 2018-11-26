import React from 'react';

class DocusignUnlink extends React.Component {
  render() {
    return (
      <div>
        <a
          href={
            process.env.ORIGIN || 'http://localhost:9000/auth/docusign/logout'
          }
        >
          Unlink Docusign
        </a>
      </div>
    );
  }
}

export default DocusignUnlink;
