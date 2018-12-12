import React from 'react';
import './OurTeam.css';

const OurTeam = () => {
  return (
    <div className='team'>
      <h1>Our Team: </h1>
      <div className='team-container'>
        <div clasName='team-member'>
          <h5>Brandon Aguirre</h5>
          <a href='https://github.com/DirupT'>github</a>
        </div>
        <div clasName='team-member'>
          <h5>Jeremy Jones</h5>
          <a href='https://github.com/crypto-jones'>github</a>
        </div>
        <div clasName='team-member'>
          <h5>Zack Hitchcock</h5>
          <a href='https://github.com/zackhitch'>github</a>
        </div>
        <div clasName='team-member'>
          <h5>Randy Calderon</h5>
          <a href='https://github.com/RandyCalderon'>github</a>
        </div>
        <div clasName='team-member'>
          <h5>Sean Chavez</h5>
          <a href='https://github.com/seanchavez'>github</a>
        </div>
        <div />
      </div>
    </div>
  );
};

export default OurTeam;
