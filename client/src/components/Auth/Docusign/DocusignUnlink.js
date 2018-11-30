import React from 'react';
import { Button } from 'reactstrap';

class DocusignUnlink extends React.Component {
  render() {
    return (
      <Button
        color="primary"
        href={
          process.env.ORIGIN || 'http://localhost:9000/auth/docusign/logout'
        }
      >
        Unlink DocuSign
      </Button>
    );
  }
}

export default DocusignUnlink;
