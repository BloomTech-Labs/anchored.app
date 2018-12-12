import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { ModalInfo } from './styles/DocumentModalStyles';

const LinkModal = ({ doc, toggle, isOpen }) => {
  if (!doc.verified || !isOpen) return null;

  const verified_proof = JSON.parse(doc.verified_proof);
  const block_height = verified_proof.anchorId;
  const link = `https://live.blockcypher.com/btc/block/${block_height}`;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        Your document has been anchored to Bitcoin block{' '}
        <b>{verified_proof.anchorId}</b> within Merkle root:
        <ModalInfo>
          <b>{verified_proof.expectedValue}</b>
        </ModalInfo>
      </ModalBody>

      <ModalFooter>
        <Button
          href={link}
          target="_blank"
          alt=""
          color="info"
          onClick={toggle}
        >
          Link to BTC block
        </Button>

        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LinkModal;
