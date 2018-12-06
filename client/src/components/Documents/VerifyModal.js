import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const VerifyModal = ({ isOpen, toggle, getProof }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        Please verify that you would like to use one credit to proof your
        document.
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={getProof}>
          Proof
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VerifyModal;
