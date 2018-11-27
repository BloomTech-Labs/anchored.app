import React from 'react';
import Nav from './Nav/Nav.js';
import Checkout from './Stripe/Checkout.js';
import Documents from './Documents/Documents';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <p>Welcome, {this.props.user}</p>
        <Documents />
        <Checkout
          name={'Chainpoint-DocuSign'}
          description={'Purchase Credit'}
          amount={10}
        />
      </div>
    );
  }
}

export default Home;
