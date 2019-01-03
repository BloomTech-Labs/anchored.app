import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CSVLink } from 'react-csv';

const LinkModal = ({ doc, toggle, isOpen }) => {
  if (!doc.verified || !isOpen) return null;

  const verified_proof = JSON.parse(doc.verified_proof);
  const block_height = verified_proof.anchorId;
  const link = `https://live.blockcypher.com/btc/block/${block_height}`;

  // Removes "Please DocuSign: " from file name
  const fileName = doc.subject.replace(/Please DocuSign: /, '');

  // Data exported to CSV
  const downloadData = [
    [fileName],
    [`Bitcoin Block: ${verified_proof.anchorId}`],
    [`Merkle Root: ${verified_proof.expectedValue}`],
    [link],
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        Your document has been anchored to Bitcoin block{' '}
        <b>{verified_proof.anchorId}</b>
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
        <CSVLink
          data={downloadData}
          filename={`proofd${verified_proof.anchorId}`}
        >
          {' '}
          <Button color="primary" onClick={toggle}>
            Download
          </Button>
        </CSVLink>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LinkModal;
