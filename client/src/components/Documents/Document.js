import React from 'react';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
} from './styles/DocumentStyles';

const Document = props => {
  return (
    <DocumentContainer>
      <DocumentSubject>{props.doc.subject}</DocumentSubject>
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
