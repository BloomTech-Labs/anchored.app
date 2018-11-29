import React from 'react';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
} from './styles/DocumentStyles';

const Document = props => {
  const details = `
  https://appdemo.docusign.com/documents/details/${props.doc.envelope_id}`;
  return (
    <DocumentContainer>
      <DocumentSubject target="_blank" href={details}>
        {props.doc.subject}
      </DocumentSubject>
      <DocumentProof onClick={() => props.getProof(props.doc.id)}>
        {props.doc.verified
          ? 'Link to Proof'
          : props.doc.status === 'completed'
          ? 'Click to Proof'
          : 'Not signed'}
      </DocumentProof>
    </DocumentContainer>
  );
};

export default Document;
