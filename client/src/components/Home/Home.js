import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import DashboardNav from '../Nav/DashboardNav.js';
import Documents from '../Documents/Documents.js';
import Settings from '../Settings/Settings.js';
import Billing from '../Billing/Billing.js';
import Buy from '../Stripe/Buy.js';
import Footer from '../Footer/Footer.js';
import Privacy from '../Privacy/Privacy.js';
import Terms from '../Terms/Terms.js';
import { HomeContainer } from './HomeStyles.js';
import OurTeam from '../OurTeam/OurTeam.js';

class Home extends React.Component {
  render() {
    if (
      this.props.location.pathname ===
      '/loaderio-86d743f6cf59ddc63db102b19d92e7ba'
    ) {
      return 'loaderio-86d743f6cf59ddc63db102b19d92e7ba';
    }

    return (
      <Fragment>
        <HomeContainer>
          <DashboardNav />
          <Route exact path='/' component={Documents} />
          <Route path='/account' component={Billing} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/buy' component={Buy} />
          <Route exact path='/team' component={OurTeam} />
          <Route exact path='/privacy' component={Privacy} />
          <Route exact path='/terms' component={Terms} />
        </HomeContainer>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(Home);
