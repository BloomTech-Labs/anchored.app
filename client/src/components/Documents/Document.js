import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
  LoadingContainer,
} from './styles/DocumentStyles';

import { ModalInfo } from './styles/DocumentModalStyles';

import { BeatLoader } from 'react-spinners';
import axios from 'axios';

class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalVerify: false,
    };
  }

  componentDidMount() {
    if (this.props.doc.loading) {
      this.checkLoading();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getProof = () => {
    this.props.getProof(this.props.doc.id);
    this.toggleVerifyPay();
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleVerifyPay = () => {
    this.setState({ modalVerify: !this.state.modalVerify });
  };

  checkLoading = () => {
    this.interval = setInterval(() => {
      let promise;
      if (process.env.REACT_APP_CHAINPOINT) {
        promise = axios.get(
          `${process.env.REACT_APP_CHAINPOINT}/${this.props.doc.id}/loading`
        );
      } else {
        promise = axios.get(
          `http://localhost:9000/chainpoint/${this.props.doc.id}/loading`
        );
      }
      promise
        .then(res => {
          if (!res.data.loading) {
            this.props.updateLoading(this.props.doc.id, res.data);
            this.clearInterval(this.interval);
          }
        })
        .catch(() => clearInterval(this.interval));
    }, 5000);
  };

  render() {
    const envelope_id = this.props.doc.envelope_id;
    const details = `https://appdemo.docusign.com/documents/details/${envelope_id}`;
    let verified_proof;
    let block_height;
    let link;
    if (this.props.doc.verified) {
      verified_proof = JSON.parse(this.props.doc.verified_proof);
      block_height = verified_proof.anchorId;
      link = `https://live.blockcypher.com/btc/block/${block_height}`;
    }

    return (
      <DocumentContainer>
        {this.props.doc.verified ? (
          // ***** See Proof Modal *****
          <Fragment>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
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
                  color="primary"
                  onClick={this.toggleModal}
                >
                  Link to BTC block
                </Button>
                <Button color="secondary" onClick={this.toggleModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </Fragment>
        ) : // ***************************
        null}
        <DocumentSubject target="_blank" href={details}>
          {this.props.doc.subject}
        </DocumentSubject>
        {this.props.doc.status === 'completed' &&
        !this.props.doc.verified &&
        !this.props.doc.waiting ? (
          <DocumentProof
            onClick={
              this.props.user.credits <= 0
                ? () => this.props.history.push('/buy')
                : this.toggleVerifyPay
            }
          >
            {this.props.doc.loading && !this.props.doc.error ? (
              <LoadingContainer>
                <BeatLoader color={'black'} sizeUnit={'px'} size={10} />
              </LoadingContainer>
            ) : this.props.doc.error ? (
              'Error'
            ) : (
              'Click to Proof'
            )}
          </DocumentProof>
        ) : (
          <DocumentProof
            onClick={this.props.doc.verified ? this.toggleModal : null}
          >
            {this.props.doc.verified
              ? 'See Proof'
              : this.props.doc.waiting
              ? 'Waiting...'
              : 'Not signed'}
          </DocumentProof>
        )}
        {/* { Verify Payment Modal} */}
        <Fragment>
          <Modal isOpen={this.state.modalVerify} toggle={this.toggleVerifyPay}>
            <ModalBody>
              {' '}
              Please verify that you would like to use one credit to proof your
              document.
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.getProof}>
                Proof
              </Button>
              <Button color="secondary" onClick={this.toggleVerifyPay}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Fragment>
      </DocumentContainer>
    );
  }
}

export default Document;
