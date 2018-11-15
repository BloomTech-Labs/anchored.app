import React from 'react';
import DocusignLogin from './Auth/Docusign/DocusignLogin';
import DocusignUnlink from './Auth/Docusign/DocusignUnlink';
import { connect } from 'react-redux';
import { getDocuments } from '../actions/documents';

class Home extends React.Component {
  componentDidMount() {
    this.props.getDocuments();
  }

  render() {
    let documents;
    if (this.props.fetching) {
      documents = <div>Loading</div>;
    } else if (this.props.documents) {
      documents = (
        <div>
          {this.props.documents.map(envelope =>
            envelope.envelopeDocuments.map(document => {
              return <p key={document.documentId}>{document.name}</p>;
            })
          )}
        </div>
      );
    } else {
      documents = <DocusignLogin />;
    }

    return (
      <div>
        <p>Welcome, {this.props.user}</p>
        {documents}
        <button>Buy Now</button>
        <DocusignUnlink />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: state.documents.documents,
    fetching: state.documents.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getDocuments }
)(Home);
