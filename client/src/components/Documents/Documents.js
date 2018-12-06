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
  DocumentsHeader,
  AddDocumentContainer,
  TabDescription,
  TabHeader,
  AddDocument,
  DashContainer,
  AppDiv,
  AppContainer,
  AppCopy,
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
      return this.props.envelopes.filter(env => env.waiting === 1);
    } else if (this.state.selected === 'unsigned') {
      return this.props.envelopes.filter(env => env.status !== 'completed');
    } else if (this.state.selected === 'signed') {
      return this.props.envelopes.filter(
        env =>
          env.status === 'completed' && env.waiting === 0 && env.verified === 0
      );
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
      return (
        <Fragment>
          <DashContainer>
            <DocumentsHeader>Your Connected Apps</DocumentsHeader>
            <AppContainer>
              <AppDiv>
                <AppCopy>Connect Your DocuSign Account</AppCopy>
                <DocusignLogin />
              </AppDiv>
              <AppDiv>+</AppDiv>
            </AppContainer>
          </DashContainer>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <DocumentsContainer>
          <DocumentsHeader>Your Documents</DocumentsHeader>
          <DocumentOptionsContainer>
            <DocumentsOptions
              selected={this.state.selected === 'all'}
              onClick={() => this.changeSelected('all')}
            >
              All
            </DocumentsOptions>
            <DocumentsOptions
              selected={this.state.selected === true}
              onClick={() => this.changeSelected(true)}
            >
              Proofed
            </DocumentsOptions>
            <DocumentsOptions
              selected={this.state.selected === 'waiting'}
              onClick={() => this.changeSelected('waiting')}
            >
              Pending
            </DocumentsOptions>
            <DocumentsOptions
              selected={this.state.selected === 'signed'}
              onClick={() => this.changeSelected('signed')}
            >
              Signed
            </DocumentsOptions>
            <DocumentsOptions
              selected={this.state.selected === 'unsigned'}
              onClick={() => this.changeSelected('unsigned')}
            >
              Unsigned
            </DocumentsOptions>
          </DocumentOptionsContainer>
          <TabHeader>
            <TabDescription>
              {/* ternary based on what documents tab is selected */}
              {this.state.selected === true
                ? 'Proofed Documents'
                : this.state.selected === 'waiting'
                ? 'Documents Pending Proof'
                : this.state.selected === 'signed'
                ? 'Documents Awaiting Proof'
                : this.state.selected === 'unsigned'
                ? 'Documents Awaiting Signatures'
                : 'All Documents'}
            </TabDescription>
            <AddDocumentContainer
              target="_blank"
              href="https://appdemo.docusign.com/home"
            >
              <AddDocument className="fas fa-plus-circle" />
              Add Document
            </AddDocumentContainer>
          </TabHeader>

          {this.filterCards()
            .map(doc => {
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
            })
            .reverse()}
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
