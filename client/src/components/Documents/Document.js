import React from 'react';
import DocumentModal from './DocumentModal';
import axios from 'axios';
import {
  DocumentContainer,
  DocumentSubject,
  DocumentProof,
  LoadingContainer,
} from './styles/DocumentStyles';
import { BeatLoader } from 'react-spinners';

class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockcypher_link: null,
      selected: false,
      modal: false,
      expired: false,
    };
  }

  componentDidMount() {
    if (this.props.doc.verified) {
      axios.defaults.withCredentials = false;
      const block = JSON.parse(this.props.doc.verified_proof).anchorId;
      axios
        .get(`https://api.blockcypher.com/v1/btc/main/blocks/${block}`)
        .then(res => {
          axios.defaults.withCredentials = true;
          this.setState({ blockcypher_link: res.data.hash });
        })
        .catch(() => (axios.defaults.withCredentials = true));
    }
    if (this.props.doc.loading) {
      this.setState({ selected: true });
    }
  }

  getProof = () => {
    this.setState({ selected: true, expired: false });
    this.props.getProof(this.props.doc.id);
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const details = `https://appdemo.docusign.com/documents/details/${
      this.props.doc.envelope_id
    }`;
    return (
      <DocumentContainer>
        {this.props.doc.verified ? (
          <DocumentModal
            modal={this.state.modal}
            link={this.state.blockcypher_link}
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
            {this.state.selected && !this.state.expired ? (
              <LoadingContainer>
                <BeatLoader color={'black'} sizeUnit={'px'} size={10} />
              </LoadingContainer>
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
