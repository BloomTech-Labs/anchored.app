import React from 'react';
import { connect } from 'react-redux';
import { getDocuments, getProof } from '../../actions/documents';
import DocusignLogin from '../Auth/Docusign/DocusignLogin';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink';
import Document from './Document';

class Documents extends React.Component {
  componentDidMount() {
    this.props.getDocuments();
  }

  render() {
    if (this.props.fetching) {
      return <div>Loading</div>;
    }

    if (!this.props.documents) {
      return <DocusignLogin />;
    }

    return (
      <div>
        {this.props.documents.map(doc => {
          return (
            <Document
              key={doc.envelope_id}
              doc={doc}
              getProof={this.props.getProof}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: state.documents.documents,
    fetching: state.documents.retrievingDoc,
  };
};

export default connect(
  mapStateToProps,
  { getDocuments, getProof }
)(Documents);
