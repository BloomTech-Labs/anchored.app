import React from 'react';

const Document = props => {
  return (
    <div>
      <p>{props.doc.subject}</p>
      <button onClick={() => props.getProof(props.doc.id)}>Verify</button>
    </div>
  );
};

export default Document;
