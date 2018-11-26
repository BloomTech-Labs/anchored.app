import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const TopNavBar = styled.div`
  border: 1px solid red;
  min-width: 550px;
  width: 100%;
`;

class NavBar extends Component {
  render() {
    return (
      <TopNavBar>
        <p>Proof'd Logo and NavBar</p>
      </TopNavBar>
    );
  }
}

export default withRouter(NavBar);
