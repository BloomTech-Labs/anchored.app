import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
      </div>
    );
  }
}

export default App;
