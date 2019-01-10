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
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email } = this.state;

    return (
      <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Give us your email address, and we'll notify you when our premium
          service is available.
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup onSubmit={this.handleSubmit}>
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
            size="lg"
            block
            color="info"
            style={{ marginTop: '20px' }}
            onSubmit={this.handleSubmit}
          >
            Sign Up
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default PremiumModal;
