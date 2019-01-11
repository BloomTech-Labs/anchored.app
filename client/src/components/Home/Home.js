import React from 'react';
import CTA from '../CTA/CTA.js';
import LPcontent from '../LPcontent/LPcontent.js';
import ReactGA from 'react-ga';

class Home extends React.Component {
  componentDidMount() {
    ReactGA.pageview('/');
  }

  render() {
    return (
      <div className="App">
        <CTA />
        <LPcontent />
      </div>
    );
  }
}

export default Home;
