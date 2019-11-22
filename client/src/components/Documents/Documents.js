import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnvelopes } from '../../actions/envelopes';
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

const Documents = () => {
  const [selected, setSelected] = useState('all');

  const envelopes = useSelector(state => state.envelopes.envelopes);
  const fetching = useSelector(state => state.envelopes.retrievingEnv);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.pageview('/dashboard');
    dispatch(getEnvelopes());
  }, []);

  const filterCards = () => {
    switch (selected) {
      case 'all':
        return envelopes;

      case 'waiting':
        return envelopes.filter(env => Boolean(env.waiting) === true);

      case 'unsigned':
        return envelopes.filter(env => env.status !== 'completed');

      case 'signed':
        return envelopes.filter(env => {
          const completed = env.status === 'completed';
          const waiting = Boolean(env.waiting);
          const verified = Boolean(env.verified);
          return completed && !waiting && !verified;
        });

      default:
        return envelopes.filter(env => Boolean(env.verified) === selected);
    }
  };

  if (fetching) {
    return (
      <LoadingContainer>
        <BeatLoader color={'black'} />
      </LoadingContainer>
    );
  }

  if (!envelopes) {
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
          selected={selected === 'all'}
          onClick={() => setSelected('all')}
        >
          All
        </DocumentsOptions>
        <DocumentsOptions
          selected={selected === true}
          onClick={() => setSelected(true)}
        >
          Proofed
        </DocumentsOptions>
        <DocumentsOptions
          selected={selected === 'waiting'}
          onClick={() => setSelected('waiting')}
        >
          Pending
        </DocumentsOptions>
        <DocumentsOptions
          selected={selected === 'signed'}
          onClick={() => setSelected('signed')}
        >
          Signed
        </DocumentsOptions>
        <DocumentsOptions
          selected={selected === 'unsigned'}
          onClick={() => setSelected('unsigned')}
        >
          Unsigned
        </DocumentsOptions>
      </DocumentOptionsContainer>
      <TabHeader>
        <TabDescription>
          {/* ternary based on what documents tab is selected */}
          {selected === true
            ? 'Proofed Documents'
            : selected === 'waiting'
            ? 'Documents Pending Proof'
            : selected === 'signed'
            ? 'Documents Awaiting Proof'
            : selected === 'unsigned'
            ? 'Documents Awaiting Signatures'
            : 'All Documents'}
        </TabDescription>
      </TabHeader>

      {/* { Displays documents from latest to earliest } */}
      {filterCards()
        .map(doc => <Document key={doc.envelope_id} doc={doc} user={user} />)
        .reverse()}
    </DocumentsContainer>
  );
};

export default Documents;
