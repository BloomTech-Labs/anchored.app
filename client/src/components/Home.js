import React from 'react';
<<<<<<< HEAD
import DocusignLogin from './Auth/Docusign/DocusignLogin';
import DocusignUnlink from './Auth/Docusign/DocusignUnlink';
import { connect } from 'react-redux';
import { getDocuments } from '../actions/documents';
import Nav from './Nav/Nav.js';
=======
import { Route } from 'react-router-dom';
import DashboardNav from './Nav/DashboardNav.js';
import Documents from './Documents/Documents.js';
import Settings from './Settings/Settings.js';
// import Checkout from './Stripe/Checkout.js';
>>>>>>> b9694651ddb725108954124109c95667ac65c216

class Home extends React.Component {
  render() {
<<<<<<< HEAD
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
        <DocusignUnlink />
=======
    return (
      <div className="App">
        <DashboardNav />
        <p>
          Welcome{' '}
          {this.props.user.first_name
            ? this.props.user.first_name
            : this.props.user.username}
        </p>
        <Route exact path="/" component={Documents} />
        {/* <Route path="/billing" component={Billing} /> */}
        <Route exact path="/settings" component={Settings} />

        {/* <Checkout
          name={'Chainpoint-DocuSign'}
          description={'Purchase Credit'}
          amount={10}
        /> */}
>>>>>>> b9694651ddb725108954124109c95667ac65c216
      </div>
    );
  }
}

<<<<<<< HEAD
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
=======
export default Home;
>>>>>>> b9694651ddb725108954124109c95667ac65c216
