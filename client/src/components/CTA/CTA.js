import React, { Component } from 'react';
import styled from 'styled-components';
import './CTA.css';
import playImg from '../../assets/play-circle.svg';

const Container = styled.div`
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

class CTA extends Component {
  render() {
    return (
      <Container>
        <h2>Get proof, not just trust</h2>
        <p>Blockchain enabled verification platform</p>
        <CtaButton>CHECK OUR PRICES</CtaButton>
        <Demo>
          <img src={playImg} alt="play icon" width="20%" />
          <p>Watch the Demo</p>
        </Demo>
      </Container>
    );
  }
}

export default CTA;
