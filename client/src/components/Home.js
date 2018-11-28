import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DocusignLogin from './Auth/Docusign/DocusignLogin';
import DocusignUnlink from './Auth/Docusign/DocusignUnlink';
import { connect } from 'react-redux';
import { getDocuments } from '../actions/documents';
import DashboardNav from './Nav/DashboardNav.js';
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

    console.log(this.props);
    return (
      <div className="App">
        <DashboardNav />

        <p>Welcome {this.props.user}</p>
        {/* <Route exact path="/" component={Documents} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/billing" component={Billing} /> */}
        {/* {documents}
        <Checkout
          name={'Chainpoint-DocuSign'}
          description={'Purchase Credit'}
          amount={10}
        />
        <DocusignUnlink /> */}
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
