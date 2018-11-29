import React from 'react';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
} from './styles/DocumentStyles';

class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  getProof = () => {
    this.props.getProof(this.props.doc.id);
    if (
      this.props.doc.status === 'completed' &&
      !this.props.doc.verified &&
      !this.props.doc.waiting
    ) {
      this.setState({ selected: true });
    }
  };

  render() {
    const details = `https://appdemo.docusign.com/documents/details/${
      this.props.doc.envelope_id
    }`;
    return (
      <DocumentContainer>
        <DocumentSubject target="_blank" href={details}>
          {this.props.doc.subject}
        </DocumentSubject>
        {this.props.doc.status === 'completed' &&
        !this.props.doc.verified &&
        !this.props.doc.waiting ? (
          <DocumentProof onClick={this.getProof}>
            {this.state.selected ? '...' : 'Click to Proof'}
          </DocumentProof>
        ) : (
          <DocumentProof>
            {this.props.doc.verified
              ? 'Link to Proof'
              : this.props.doc.waiting
              ? 'Waiting...'
              : 'Not signed'}
          </DocumentProof>
        )}
      </DocumentContainer>
    );
  }
}

export default Document;
