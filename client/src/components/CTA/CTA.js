import React, { Component } from 'react';
import styled from 'styled-components';
import './CTA.css';
import playImg from '../../assets/play-circle.svg';

const CtaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CtaButton = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 65px;
  font-weight: bold;
  font-size: 1.3rem;
`;

const Demo = styled.div`
  width: 200px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OurPatrons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1026px;
  max-width: 100%;
  margin: 40px;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

const Logos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 1026px;
  max-width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 10px;
  padding: 10px;
`;

class CTA extends Component {
  render() {
    return (
      <CtaContainer>
        <h2>Get proof, not just trust</h2>
        <p>Blockchain enabled verification platform</p>
        <CtaButton>CHECK OUR PRICES</CtaButton>
        <Demo>
          <img src={playImg} alt="play icon" width="20%" />
          <p>Watch the Demo</p>
        </Demo>
        <OurPatrons>
          <h3>Used By Our Friends At:</h3>
          <Logos>
            <div className="friends" />
            <div className="friends" />
            <div className="friends" />
            <div className="friends" />
            <div className="friends" />
          </Logos>
        </OurPatrons>
      </CtaContainer>
    );
  }
}

export default CTA;
