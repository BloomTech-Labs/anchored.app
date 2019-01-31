import React from 'react';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
  LoadingContainer,
  ProofDocTextContainer,
  TimestampContainer,
  Timestamp,
  PreviewIcon,
} from './styles/DocumentStyles';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import LinkModal from './LinkModal';
import PDFModal from './PDFModal';
import VerifyModal from './VerifyModal';
import moment from 'moment';

class Document extends React.Component {
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
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getProof = () => {
    this.props.getProof(this.props.doc.id);
    this.toggleVerifyPay();
  };

  getDocuments = () => {
    const envelope_id = this.props.doc.envelope_id;
    if (process.env.REACT_APP_DOCUMENTS) {
      axios
        .get(`${process.env.REACT_APP_DOCUMENTS}/${envelope_id}`)
        .then(res => {
          const data = Buffer.from(res.data.document.data).toString();
          this.setState({ document: data }, () => {
            this.togglePdfModal();
          });
        })
        .catch(err => console.log(err));
    } else {
      axios
        .get(`http://localhost:9000/documents/${envelope_id}`)
        .then(res => {
          this.setState({ document: res.data.document }, () => {
            this.togglePdfModal();
          });
        })
        .catch(err => console.log(err));
    }
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
    // Removes "Please DocuSign: " from file title
    const docuSignSubject = this.props.doc.subject;
    const cutDocSignTitle = docuSignSubject.replace(/Please DocuSign: /, '');

    // Timestamp of BTC proof
    let timestamp;

    if (this.props.doc.verified) {
      const verified_proof = JSON.parse(this.props.doc.verified_proof);
      timestamp = verified_proof.verifiedAt;
    }

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

        <PDFModal
          doc={this.props.doc}
          toggle={this.togglePdfModal}
          isOpen={this.state.modalPdf}
          document={this.state.document}
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
              'Click to Anchor'
            )}
          </DocumentProof>
        ) : (
          <DocumentProof
            onClick={this.props.doc.verified ? this.toggleLinkModal : null}
          >
            {this.props.doc.verified
              ? 'See Anchor'
              : this.props.doc.waiting
              ? 'Waiting...'
              : 'Not signed'}
          </DocumentProof>
        )}
        <ProofDocTextContainer>
          <DocumentSubject onClick={this.getDocuments}>
            {cutDocSignTitle} <PreviewIcon className="fas fa-search" />
          </DocumentSubject>
          {/* Returns proofed timestamp if exists */}
          {timestamp !== undefined ? (
            <TimestampContainer>
              Anchored
              <Timestamp>
                {moment
                  .utc(timestamp)
                  .local()
                  .format('D MMM YYYY hh:mma')}
              </Timestamp>
            </TimestampContainer>
          ) : null}
        </ProofDocTextContainer>
      </DocumentContainer>
    );
  }
}

export default Document;
