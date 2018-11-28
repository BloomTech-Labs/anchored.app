import React, { Component, Fragment } from 'react';
import { getUserInfo } from '../../actions/user.js';
import { connect } from 'react-redux';
import request from 'request';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class PasswordReset extends Component {
  state = {
    modalOne: false,
    modalTwo: false,
  };

  toggleOne = () => {
    this.setState({
      modalOne: !this.state.modalOne,
    });
  };

  toggleTwo = () => {
    this.setState({
      modalTwo: !this.state.modalTwo,
    });
  };

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

    if (!this.props.user.first_name) {
      console.log('test');
      request(options, (error, response, body) => {
        if (error) throw new Error(error);
        this.toggleOne();
      });
    } else {
      this.toggleTwo();
    }
  };

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={this.handleSubmit}>
          Change Password
        </Button>

        <Modal
          isOpen={this.state.modalOne}
          toggle={this.toggleOne}
          className={this.props.className}
        >
          <ModalBody>
            We've just sent you an email to reset your password.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleOne}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.modalTwo}
          toggle={this.toggleTwo}
          className={this.props.className}
        >
          <ModalBody>
            You've logged in using a social or enterprise connection. Please
            reset your password with the appropriate system.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleTwo}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
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
