import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import DashboardNav from '../Nav/DashboardNav.js';
import Documents from '../Documents/Documents.js';
import Settings from '../Settings/Settings.js';
import Billing from '../Billing/Billing.js';
import Buy from '../Stripe/Buy.js';
import Footer from '../Footer/Footer.js';
import { HomeContainer } from './HomeStyles.js';
import OurTeam from '../OurTeam/OurTeam.js';

class Home extends React.Component {
  render() {
    return (
      <Fragment>
        <HomeContainer>
          <DashboardNav />
          <Route exact path="/" component={Documents} />
          <Route path="/account" component={Billing} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/team" component={OurTeam} />
        </HomeContainer>
        <Footer />
      </Fragment>
    );
  }
}

export default Home;
