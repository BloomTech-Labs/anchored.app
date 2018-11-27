import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Auth0 from './Auth/Auth0/Auth0';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';

import Billing from '../components/Views/Billing';

axios.defaults.withCredentials = true;

const auth = new Auth0();

class App extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    if (this.props.fetching) {
      return <div className="App">Loading...</div>;
    }

    if (this.props.user) {
      return (
        <div>
          <Route exact path="/" user={this.props.user} component={Home} />
          <Route path="/billing" component={Billing} />
        </div>
      );
    }

    return (
      <div className="App">
        <h2>Welcome to Chainpoint-DocuSign</h2>
        <button onClick={auth.login}>Sign In</button>
        <button onClick={auth.signUp}>Sign Up</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user.user,
    fetching: state.user.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getUserInfo }
)(App);
