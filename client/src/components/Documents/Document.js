import React from 'react';
import DocumentModal from './DocumentModal';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
  LoadingContainer,
} from './styles/DocumentStyles';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
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
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
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
    return (
      <DocumentContainer>
        {this.props.doc.verified ? (
          <DocumentModal
            modal={this.state.modal}
            toggleModal={this.toggleModal}
            doc={this.props.doc}
          />
        ) : null}
        <DocumentSubject target="_blank" href={details}>
          {this.props.doc.subject}
        </DocumentSubject>
        {this.props.doc.status === 'completed' &&
        !this.props.doc.verified &&
        !this.props.doc.waiting ? (
          <DocumentProof onClick={this.getProof}>
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
              ? 'Link to Proof'
              : this.props.doc.waiting
              ? 'Waiting...'
              : 'Not signed'}
          </DocumentProof>
        )}
      </DocumentContainer>
    );
  }
}

export default Document;
