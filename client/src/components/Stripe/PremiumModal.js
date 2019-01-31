import React, { Component } from 'react';
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

class PremiumModal extends Component {
  state = {
    name: '',
    email: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => alert('Success. Thank you!'))
      .catch(error =>
        alert(
          'There was an error sending your message. Please contact us at support@anchored.app.'
        )
      );

    this.setState({
      name: '',
      email: '',
    });

    this.props.toggle();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email } = this.state;
    const isEnabled =
      name.length > 0 &&
      email.length > 0 &&
      email.includes('@') &&
      email.includes('.');

    return (
      <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
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
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
          <Button
            disabled={!isEnabled}
            size="lg"
            block
            color="info"
            style={{ marginTop: '20px' }}
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default PremiumModal;
