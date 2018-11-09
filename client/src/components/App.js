import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './Home';
import { Auth0Lock } from 'auth0-lock';
import auth0 from 'auth0-js';

// Initializing our Auth0Lock
const lock = new Auth0Lock(
  process.env.REACT_APP_CLIENT_ID,
  process.env.REACT_APP_DOMAIN_URL
);

const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN_URL,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: 'http://localhost:3000',
});

webAuth.parseHash((err, authResult) => {
  if (authResult) {
    // Save the tokens from the authResult in local storage or a cookie
    console.log('AUTH RESULT: ', authResult);
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
  } else if (err) {
    // Handle errors
    console.log(err);
  }
});

class App extends Component {
  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  render() {
    if (this.isAuthenticated()) {
      return (
        <div className="App">
          <Route exact path="/" component={Home} />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Welcome to Chainpoint-DocuSign</h2>
          <button onClick={() => lock.show()}>Log in</button>
        </div>
      );
    }
  }
}

export default App;
