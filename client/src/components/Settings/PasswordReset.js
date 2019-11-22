import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import request from 'request';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { EditButton } from './styles/SettingsStyles.js';

const PasswordReset = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const user = useSelector(state => state.user.user);

  // For social or enterprise login
  const toggleOne = () => setModalOne(!modalOne);

  // For email login
  const toggleTwo = () => setModalTwo(!modalTwo);

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_DOMAIN_URL}/dbconnections/change_password`,
      headers: { 'content-type': 'application/json' },
      body: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        email: user.email,
        connection: 'Username-Password-Authentication',
      },
      json: true,
    };

    // If logged in via email
    // TODO: May need to restructure db later
    // and use something else on the user obj instead of `first_name`
    if (!user.first_name) {
      request(options, (error, response, body) => {
        if (error) throw new Error(error);
        toggleOne();
      });
    }
    // If logged in via social connection
    else {
      toggleTwo();
    }
  };

  return (
    <Fragment>
      <EditButton size="lg" onClick={handleSubmit}>
        Change Password
      </EditButton>

      <Modal isOpen={modalOne} toggle={toggleOne}>
        <ModalBody>
          We've just sent you an email to reset your password.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleOne}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalTwo} toggle={toggleTwo}>
        <ModalBody>
          You've logged in using a social or enterprise connection. Please reset
          your password with the appropriate system.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleTwo}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default PasswordReset;
