import React, { Component } from 'react';
import axios from 'axios';

class Nav extends Component {
  handleLogout = () => {
    axios
      .get('http://localhost:9000/auth/auth0/logout')
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return <button onClick={this.handleLogout}>Log out</button>;
  }
}

export default Nav;
