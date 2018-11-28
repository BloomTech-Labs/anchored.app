import React from 'react';
import Nav from './Nav/Nav.js';
import Documents from './Documents/Documents';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <p>Welcome, {this.props.user}</p>
        <Documents />
      </div>
    );
  }
}

export default Home;
