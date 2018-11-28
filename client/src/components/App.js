import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';

import TopNavBar from './Nav/NavBar.js';
import CTA from './CTA/CTA.js';

axios.defaults.withCredentials = true;

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
        <TopNavBar />
        <CTA />
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
