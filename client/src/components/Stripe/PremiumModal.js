import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

const PremiumModal = ({ isOpen, toggle }) => {
  return (
    <Modal centered isOpen={isOpen} toggle={toggle}>
      {/* <ModalBody>Sign up</ModalBody> */}
      <ModalHeader toggle={toggle}>
        Give us your email address, and we'll notify you when our premium
        service is available.
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input type="name" name="name" id="name" placeholder="Full Name" />
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
};

export default PremiumModal;
