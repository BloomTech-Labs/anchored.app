import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getEnvelopes, getProof } from '../../actions/envelopes';
import DocusignLogin from '../Auth/Docusign/DocusignLogin';
import Document from './Document';

import {
  DocumentOptionsContainer,
  DocumentsOptions,
  DocumentsContainer,
  AddDocument,
} from './styles/DocumentsStyles';

class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'all',
    };
  }

  componentDidMount() {
    this.props.getEnvelopes();
  }

  changeSelected = tab => {
    this.setState({ selected: tab });
  };

  filterCards = () => {
    if (this.state.selected === 'all') {
      return this.props.envelopes;
    } else if (this.state.selected === 'waiting') {
      return this.props.envelopes.filter(env => env.status !== 'completed');
    } else {
      return this.props.envelopes.filter(env => {
        return Boolean(env.verified) === this.state.selected;
      });
    }
  };

  render() {
    if (this.props.fetchingEnv) {
      return <div>Loading</div>;
    }

    if (!this.props.envelopes) {
      return <DocusignLogin />;
    }

    return (
      <DocumentsContainer>
        <DocumentOptionsContainer>
          <DocumentsOptions
            selected={this.state.selected === true}
            onClick={() => this.changeSelected(true)}
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

        <AddDocument
          target="_blank"
          href="https://appdemo.docusign.com/home"
          className="fas fa-plus-circle"
        />
      </DocumentsContainer>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.envelopes.envelopes);
  return {
    envelopes: state.envelopes.envelopes,
    fetchingEnv: state.envelopes.retrievingEnv,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getEnvelopes, getProof }
  )(Documents)
);
