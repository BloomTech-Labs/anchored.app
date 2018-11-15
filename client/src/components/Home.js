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
      documents = this.props.documents.map(data => {
        let image = Buffer.from(data.image.data).toString('base64');
        return (
          <img
            key={data.envelope_id + data.document_id}
            src={`data:image/png;base64,${image}`}
            alt=""
          />
        );
      });
    } else {
      documents = <DocusignLogin />;
    }

    return (
      <div className="App">
        <Nav />
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
