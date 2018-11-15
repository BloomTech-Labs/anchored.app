import React from 'react';
import DocusignLogin from './Auth/Docusign/DocusignLogin';
import DocusignUnlink from './Auth/Docusign/DocusignUnlink';
import { connect } from 'react-redux';
import { getDocuments } from '../actions/documents';
import Nav from './Nav/Nav.js';
import Checkout from './Stripe/Checkout.js';

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
      <div className="App">
        <Nav />
        <p>Welcome, {this.props.user}</p>
        {documents}
<<<<<<< HEAD
        <button>Buy Now</button>
        <DocusignUnlink />
=======
        <Checkout
          name={'Chainpoint-DocuSign'}
          description={'Purchase Credit'}
          amount={10}
        />
>>>>>>> b823791ee7d4941b09220c455f0c2675c9d7e837
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
