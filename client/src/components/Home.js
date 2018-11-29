import React from 'react';
import { Route } from 'react-router-dom';
import DashboardNav from './Nav/DashboardNav.js';
import Documents from './Documents/Documents.js';
import Settings from './Settings/Settings.js';
// import Checkout from './Stripe/Checkout.js';

class Home extends React.Component {
  render() {
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
      </div>
    );
  }
}

export default Home;
