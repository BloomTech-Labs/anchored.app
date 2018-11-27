import React from 'react';
import { connect } from 'react-redux';
import { getDocuments, getProof } from '../../actions/documents';
import DocusignLogin from '../Auth/Docusign/DocusignLogin';
import DocusignUnlink from '../Auth/Docusign/DocusignUnlink';
import Document from './Document';

import {
  DocumentOptionsContainer,
  DocumentsOptions,
  DocumentsContainer,
} from './styles/DocumentsStyles';

class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'all',
    };
  }
  componentDidMount() {
    this.props.getDocuments();
  }

  changeSelected = tab => {
    this.setState({ selected: tab });
  };

  filterCards = () => {
    if (this.state.selected === 'all') {
      return this.props.documents;
    } else if (this.state.selected === 'waiting') {
      return this.props.documents.filter(doc => doc.status !== 'completed');
    } else {
      return this.props.documents.filter(doc => {
        return doc.verified == this.state.selected;
      });
    }
  };

  render() {
    if (this.props.fetching) {
      return <div>Loading</div>;
    }

    if (!this.props.documents) {
      return <DocusignLogin />;
    }

    return (
      <DocumentsContainer>
        <DocumentOptionsContainer>
          <DocumentsOptions
            selected={this.state.selected === 1}
            onClick={() => this.changeSelected(1)}
          >
            Verified Contracts
          </DocumentsOptions>
          <DocumentsOptions
            selected={this.state.selected === 'waiting'}
            onClick={() => this.changeSelected('waiting')}
          >
            Contracts waiting signatures
          </DocumentsOptions>

          <DocumentsOptions
            selected={this.state.selected === 'all'}
            onClick={() => this.changeSelected('all')}
          >
            All documents
          </DocumentsOptions>
        </DocumentOptionsContainer>

        {this.filterCards().map(doc => {
          return (
            <Document
              key={doc.envelope_id}
              doc={doc}
              getProof={this.props.getProof}
            />
          );
        })}
      </DocumentsContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    documents: state.documents.documents,
    fetching: state.documents.retrievingDoc,
  };
};

export default connect(
  mapStateToProps,
  { getDocuments, getProof }
)(Documents);
