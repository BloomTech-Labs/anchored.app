import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth/Auth';

const LandingPage = () => {
  return (
    <div>
      <div>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Sign In</Link>
        <Auth />
      </div>
      <button>Buy Now</button>
    </div>
  );
};

export default LandingPage;
