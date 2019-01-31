import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getEnvelopes, getProof, updateLoading } from '../../actions/envelopes';
import { BeatLoader } from 'react-spinners';
import { LoadingContainer } from './styles/DocumentsStyles.js';
import DocusignLogin from '../Auth/Docusign/DocusignLogin';
import Document from './Document';
import DocusignLogo from '../../assets/docusign_logo_standard.png';
import {
  DocumentOptionsContainer,
  DocumentsOptions,
  DocumentsContainer,
  DocumentsHeader,
  AddDocumentContainer,
  TabDescription,
  TabHeader,
  AddDocument,
  AppDiv,
  AppContainer,
  AppCopy,
  AddIcon,
  Small,
  Img,
  Header,
} from './styles/DocumentsStyles';
import ReactGA from 'react-ga';

class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'all',
      loading: true,
    };
  }

  componentDidMount() {
    ReactGA.pageview('/dashboard');
    this.props.getEnvelopes();
  }

  changeSelected = tab => {
    this.setState({ selected: tab });
  };

  filterCards = () => {
    if (this.state.selected === 'all') {
      return this.props.envelopes;
    } else if (this.state.selected === 'waiting') {
      return this.props.envelopes.filter(env => Boolean(env.waiting) === true);
    } else if (this.state.selected === 'unsigned') {
      return this.props.envelopes.filter(env => env.status !== 'completed');
    } else if (this.state.selected === 'signed') {
      return this.props.envelopes.filter(env => {
        const completed = env.status === 'completed';
        const waiting = Boolean(env.waiting);
        const verified = Boolean(env.verified);
        return completed && !waiting && !verified;
      });
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
        <DocumentsContainer>
          <DocumentsHeader>Your Connected Apps</DocumentsHeader>
          <AppContainer>
            <AppDiv>
              <Img src={DocusignLogo} alt="DocuSign Logo" />
              <DocusignLogin />
            </AppDiv>
            <AppDiv>
              <AddIcon>+</AddIcon>
              <AppCopy>Add New App</AppCopy>
              <Small>(Coming Soon!)</Small>
            </AppDiv>
          </AppContainer>
        </DocumentsContainer>
      );
    }

    return (
      <DocumentsContainer>
        <Header>
          <DocumentsHeader>Your Documents</DocumentsHeader>
          <AddDocumentContainer
            target="_blank"
            href="https://app.docusign.com/home"
          >
            <AddDocument className="fas fa-plus-circle" />
            Add Document
          </AddDocumentContainer>
        </Header>
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
            Anchored
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
              ? 'Anchored Documents'
              : this.state.selected === 'waiting'
              ? 'Documents Pending Anchor'
              : this.state.selected === 'signed'
              ? 'Documents Awaiting Anchor'
              : this.state.selected === 'unsigned'
              ? 'Documents Awaiting Signatures'
              : 'All Documents'}
          </TabDescription>
        </TabHeader>

        {/* { Displays documents from latest to earliest } */}
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
