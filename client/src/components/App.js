import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import './App.css';
import Home from './Home/Home.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';
import { BeatLoader } from 'react-spinners';
import { Switch, Route } from 'react-router-dom';
import { HomeContainer } from './Home/HomeStyles.js';
import styled from 'styled-components';
import OurTeam from './OurTeam/OurTeam';
import Terms from './Terms/Terms.js';
import Privacy from './Privacy/Privacy.js';
import DashboardNav from './Nav/DashboardNav.js';
import Documents from './Documents/Documents.js';
import Settings from './Settings/Settings.js';
import Billing from './Billing/Billing.js';
import Buy from './Stripe/Buy.js';
import Footer from './Footer/Footer.js';
import TopNavBar from './Nav/NavBar.js';

axios.defaults.withCredentials = true;

const LoadingContainer = styled.div`
  display: flex;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TwitterAlert = styled.div`
  width: 40%;
  height: 20%;
  background-color: yellow;
  border: 1px solid black;
  border-radius: 4px;
  margin: 20px;
  padding: 10px;
`;

export const TwitterText = styled.p`
  font-size: 1rem;
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

    if (this.props.fetching || (!this.props.fetched && !this.props.error)) {
      return (
        <LoadingContainer>
          {/* Uncomment the TwitterAlert section if needed due to high traffic */}
          {/* <TwitterAlert>
            <TwitterText>
              Someone with <em>a lot</em> of Twitter followers tweeted about us,
              and we're experiencing abnormally high traffic. Thanks for your
              patience!
            </TwitterText>
          </TwitterAlert> */}
          <BeatLoader color={'black'} loading={this.state.loading} />
        </LoadingContainer>
      );
    }

    return (
      <Fragment>
        <HomeContainer>
          {user ? <DashboardNav /> : <TopNavBar />}
          <Switch>
            <Route exact path="/" component={user ? Documents : Home} />
            <Route path="/team" component={OurTeam} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            {user && <Route path="/account" component={Billing} />}
            {user && <Route path="/settings" component={Settings} />}
            {user && <Route path="/buy" component={Buy} />}
            <Route component={user ? Documents : Home} />
          </Switch>
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
    fetched: state.user.retrieved,
    error: state.user.error,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo }
  )(App)
);
