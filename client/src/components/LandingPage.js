import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Sign In</Link>
      </div>
      <button>Buy Now</button>
    </div>
  );
};

export default LandingPage;
