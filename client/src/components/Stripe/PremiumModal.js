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

class PremiumModal extends Component {
  state = {
    name: '',
    email: '',
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
        {/* <ModalBody>Sign up</ModalBody> */}
        <ModalHeader toggle={this.props.toggle}>
          Give us your email address, and we'll notify you when our premium
          service is available.
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Full Name"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
              />
            </FormGroup>
          </Form>
          <Button size="lg" block color="info" style={{ marginTop: '20px' }}>
            Sign Up
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default PremiumModal;
