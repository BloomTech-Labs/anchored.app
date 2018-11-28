import React, { Component, Fragment } from 'react';
import { getUserInfo } from '../../actions/user.js';
import { connect } from 'react-redux';
import request from 'request';

class PasswordReset extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `https://${
        process.env.REACT_APP_DOMAIN_URL
      }/dbconnections/change_password`,
      headers: { 'content-type': 'application/json' },
      body: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        email: this.props.user.email,
        connection: 'Username-Password-Authentication',
      },
      json: true,
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      alert(body);
    });
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.handleSubmit}>Change Password</button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    fetching: state.user.retrieving,
  };
};

export default connect(
  mapStateToProps,
  { getUserInfo }
)(PasswordReset);
