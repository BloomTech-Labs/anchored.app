import React, { Fragment, useEffect } from 'react';
import './App.css';
import Home from './Home/Home.js';
import axios from 'axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
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

function App() {
  window.scrollTo(0, 0);

  const user = useSelector(state => state.user.user);
  const fetching = useSelector(state => state.user.retrieving);
  const fetched = useSelector(state => state.user.retrieved);
  const error = useSelector(state => state.user.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (fetching || (!fetched && !error)) {
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
        <BeatLoader color={'black'} />
      </LoadingContainer>
    );
  }

  return (
    <Fragment>
      <HomeContainer>
        {user ? <DashboardNav /> : <TopNavBar />}

        <Switch>
          <Route exact path="/">
            {user ? <Documents /> : <Home />}
          </Route>

          <Route path="/team">
            <OurTeam />
          </Route>

          <Route path="/privacy">
            <Privacy />
          </Route>

          <Route path="/terms">
            <Terms />
          </Route>

          {user && (
            <Route path="/account">
              <Billing />
            </Route>
          )}

          {user && (
            <Route path="/settings">
              <Settings />
            </Route>
          )}

          {user && (
            <Route path="/buy">
              <Buy />
            </Route>
          )}

          <Route>{user ? <Documents /> : <Home />}</Route>
        </Switch>
      </HomeContainer>
      <Footer />
    </Fragment>
  );
}

export default App;
