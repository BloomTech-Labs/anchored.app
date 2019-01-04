import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import './App.css';
import Home from './Home/Home.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import TopNavBar from './Nav/NavBar.js';
import CTA from './CTA/CTA.js';
import LPcontent from './LPcontent/LPcontent.js';
import Footer from './Footer/Footer.js';
import OurTeam from './OurTeam/OurTeam';
import Terms from './Terms/Terms.js';
import Privacy from './Privacy/Privacy.js';
import { HomeContainer } from './Home/HomeStyles.js';

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
    ReactGA.initialize('UA-131725736-1');
    ReactGA.pageview('/');
  }

  render() {
    window.scrollTo(0, 0);
    if (this.props.fetching) {
      return (
        <LoadingContainer>
          <BeatLoader color={'black'} loading={this.state.loading} />
        </LoadingContainer>
      );
    }

    if (this.props.user) {
      return <Home user={this.props.user} />;
    }

    if (this.props.location.pathname === '/team') {
      return (
        <Fragment>
          <HomeContainer>
            <TopNavBar />
            <OurTeam />
          </HomeContainer>
          <Footer />
        </Fragment>
      );
    }
    if (this.props.location.pathname === '/privacy') {
      return (
        <Fragment>
          <HomeContainer>
            <TopNavBar />
            <Privacy />
          </HomeContainer>
          <Footer />
        </Fragment>
      );
    }
    if (this.props.location.pathname === '/terms') {
      return (
        <Fragment>
          <HomeContainer>
            <TopNavBar />
            <Terms />
          </HomeContainer>
          <Footer />
        </Fragment>
      );
    }

    if (this.props.location.pathname === '/loaderio-86d743f6cf59ddc63db102b19d92e7ba') {
      return 'loaderio-86d743f6cf59ddc63db102b19d92e7ba'
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
