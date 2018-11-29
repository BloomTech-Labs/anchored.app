import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './App.css';
import Home from './Home';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import TopNavBar from './Nav/NavBar.js';
import CTA from './CTA/CTA.js';
import LPcontent from './LPcontent/LPcontent.js';
import Footer from './Footer/Footer.js';

import Billing from './Billing/Billing';

axios.defaults.withCredentials = true;

const LoadingContainer = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    if (this.props.fetching) {
      return (
        <LoadingContainer>
          <BeatLoader color={'black'} loading={this.state.loading} />
        </LoadingContainer>
      );
    }

    if (this.props.user) {
<<<<<<< HEAD
      return (
        <div>
          <Route exact path="/" user={this.props.user} component={Home} />
          <Route path="/billing" component={Billing} />
        </div>
      );
=======
      return <Home user={this.props.user} />;
>>>>>>> b9694651ddb725108954124109c95667ac65c216
    }

    return (
      <div className="App">
        <TopNavBar />
        <CTA />
        <LPcontent />
        <Footer />
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

export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo }
  )(App)
);
