import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import './App.css';
import Home from './Home/Home.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';
import { BeatLoader } from 'react-spinners';
import { Route } from 'react-router-dom';
import { HomeContainer } from './Home/HomeStyles.js';
import styled from 'styled-components';
import OurTeam from './OurTeam/OurTeam';
import Terms from './Terms/Terms.js';
import Privacy from './Privacy/Privacy.js';
import ReactGA from 'react-ga';
import DashboardNav from './Nav/DashboardNav.js';
import Documents from './Documents/Documents.js';
import Settings from './Settings/Settings.js';
import Billing from './Billing/Billing.js';
import Buy from './Stripe/Buy.js';
import Footer from './Footer/Footer.js';
import TopNavBar from './Nav/NavBar.js';

ReactGA.initialize([
  { trackingId: 'UA-131725736-1', debug: true },
  { trackingId: 'UA-131909972-1', debug: true },
]);

axios.defaults.withCredentials = true;

const LoadingContainer = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    window.scrollTo(0, 0);
    const user = this.props.user;

    if (this.props.fetching) {
      return (
        <LoadingContainer>
          <BeatLoader color={'black'} loading={this.state.loading} />
        </LoadingContainer>
      );
    }

    return (
      <Fragment>
        <HomeContainer>
          {user ? <DashboardNav /> : <TopNavBar />}
          <Route exact path="/" component={user ? Documents : Home} />
          <Route path="/account" component={Billing} />
          <Route path="/settings" component={Settings} />
          <Route path="/buy" component={Buy} />
          <Route path="/team" component={OurTeam} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
        </HomeContainer>
        <Footer />
      </Fragment>
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
