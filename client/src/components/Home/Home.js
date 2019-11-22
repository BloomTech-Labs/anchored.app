import React, { useEffect } from 'react';
import CTA from '../CTA/CTA.js';
import LPcontent from '../LPcontent/LPcontent.js';
import ReactGA from 'react-ga';

const Home = () => {
  useEffect(() => {
    ReactGA.pageview('/');
  }, []);

  return (
    <div className="App">
      <CTA />
      <LPcontent />
    </div>
  );
};

export default Home;
