import React from 'react';
import CTA from '../CTA/CTA.js';
import LPcontent from '../LPcontent/LPcontent.js';
import ReactGA from 'react-ga';


class Home extends React.Component {
  componentDidMount() {
    ReactGA.pageview('/');
  }

  render() {
    if (
      this.props.location.pathname ===
      '/loaderio-86d743f6cf59ddc63db102b19d92e7ba/'
    ) {
      return 'loaderio-86d743f6cf59ddc63db102b19d92e7ba';
    }

    return (
      <div className="App">
        <CTA />
        <LPcontent />
      </div>
    );
  }
}

export default Home;
