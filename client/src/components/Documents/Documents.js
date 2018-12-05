import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getEnvelopes, getProof, updateLoading } from '../../actions/envelopes';
import { BeatLoader } from 'react-spinners';
import { LoadingContainer } from './styles/DocumentsStyles.js';
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
      loading: true,
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
      return (
        <LoadingContainer>
          <BeatLoader color={'black'} loading={this.state.loading} />
        </LoadingContainer>
      );
    }

    if (!this.props.envelopes) {
      return <DocusignLogin />;
    }

    return (
      <Fragment>
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
          <AddDocument
            target="_blank"
            href="https://appdemo.docusign.com/home"
            className="fas fa-plus-circle"
          />

          {this.filterCards().map(doc => {
            return (
              <Document
                key={doc.envelope_id}
                doc={doc}
                user={this.props.user}
                history={this.props.history}
                getProof={this.props.getProof}
                updateLoading={this.props.updateLoading}
              />
            );
          })}
        </DocumentsContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    envelopes: state.envelopes.envelopes,
    fetchingEnv: state.envelopes.retrievingEnv,
    user: state.user.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getEnvelopes, getProof, updateLoading }
  )(Documents)
);
