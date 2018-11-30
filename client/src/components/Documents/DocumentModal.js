import React from 'react';
import {
  ModalWrapper,
  ModalContent,
  ModalLink,
  ModalInfo,
} from './styles/DocumentModalStyles';

const DocumentModal = props => {
  const verified_proof = JSON.parse(props.doc.verified_proof);
  const link = `https://live.blockcypher.com/btc/block/${props.link}`;
  return (
    <ModalWrapper style={props.modal ? { display: 'block' } : null}>
      <ModalContent>
        <ModalInfo>Bitcoin Block: {verified_proof.anchorId}</ModalInfo>
        <ModalInfo>Merkle Root: {verified_proof.expectedValue}</ModalInfo>
        <ModalLink href={link} target="_blank" alt="">
          Link to btc block
        </ModalLink>
        <div onClick={props.toggleModal}>Cancel</div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default DocumentModal;
