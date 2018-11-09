import React from 'react';
import { Link } from 'react-router-dom';
import DocusignLogin from './Auth/Docusign/DocusignLogin';

const Home = () => {
  return (
    <div>
      <div>
        <DocusignLogin />
      </div>
      <button>Buy Now</button>
    </div>
  );
};

export default Home;
