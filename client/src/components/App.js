import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Auth0 from './Auth/Auth0/Auth0';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';

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
          <Home user={this.props.user} />
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
  return {
    user: state.user.user,
    fetching: state.user.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getUserInfo }
)(App);
