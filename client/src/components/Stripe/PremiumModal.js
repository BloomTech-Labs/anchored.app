import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const PremiumModal = props => {
  const [info, setInfo] = useState({ name: '', email: '' });

  const handleSubmit = e => {
    e.preventDefault();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...info }),
    })
      .then(() => alert('Success. Thank you!'))
      .catch(error =>
        alert(
          'There was an error sending your message. Please contact us at support@proofd.app.'
        )
      );

    setInfo({ name: '', email: '' });
    props.toggle();
  };

  const handleChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const { name, email } = info;

  const isEnabled =
    name.length > 0 &&
    email.length > 0 &&
    email.includes('@') &&
    email.includes('.');

  return (
    <Modal centered isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        Give us your email address, and we'll notify you when our premium
        service is available.
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
        <Button
          disabled={!isEnabled}
          size="lg"
          block
          color="info"
          style={{ marginTop: '20px' }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PremiumModal;
