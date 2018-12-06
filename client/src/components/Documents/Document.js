import React, { Component } from 'react';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
  LoadingContainer,
} from './styles/DocumentStyles';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import LinkModal from './LinkModal';
import PDFModal from './PDFModal';
import VerifyModal from './VerifyModal';

class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalLink: false,
      modalVerify: false,
      modalPdf: false,
      document: null,
    };
  }

  componentDidMount() {
    if (this.props.doc.loading) {
      this.checkLoading();
    }

    if (this.props.doc.verified) {
      const envelope_id = this.props.doc.envelope_id;
      axios
        .get(`http://localhost:9000/documents/${envelope_id}`)
        .then(res => this.setState({ document: res.data.document }))
        .catch(err => console.log(err));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getProof = () => {
    this.props.getProof(this.props.doc.id);
    this.toggleVerifyPay();
  };

  toggleLinkModal = () => {
    this.setState({ modalLink: !this.state.modalLink });
  };

  toggleVerifyPay = () => {
    this.setState({ modalVerify: !this.state.modalVerify });
  };

  togglePdfModal = () => {
    this.setState({ modalPdf: !this.state.modalPdf });
  };

  checkLoading = () => {
    this.interval = setInterval(() => {
      let host;
      if (process.env.REACT_APP_CHAINPOINT) {
        host = process.env.REACT_APP_CHAINPOINT;
      } else {
        host = 'http://localhost:9000/chainpoint';
      }

      const promise = axios.get(`${host}/${this.props.doc.id}/loading`);

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

    return (
      <DocumentContainer>
        <LinkModal
          doc={this.props.doc}
          toggle={this.toggleLinkModal}
          isOpen={this.state.modalLink}
        />

        <VerifyModal
          toggle={this.toggleVerifyPay}
          isOpen={this.state.modalVerify}
          getProof={this.getProof}
        />

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
            onClick={this.props.doc.verified ? this.toggleLinkModal : null}
          >
            {this.props.doc.verified
              ? 'See Proof'
              : this.props.doc.waiting
              ? 'Waiting...'
              : 'Not signed'}
          </DocumentProof>
        )}
        <DocumentSubject
          href={details}
          target="_blank"
          id={`subject${this.props.doc.id}`}
        >
          {this.props.doc.subject}
        </DocumentSubject>
      </DocumentContainer>
    );
  }
}

export default Document;
