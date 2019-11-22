import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProof, updateLoading } from '../../actions/envelopes';
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

const Document = props => {
  const [document, setDocument] = useState(null);

  const [modalLink, setModalLink] = useState(false);
  const [modalPdf, setModalPdf] = useState(false);
  const [modalVerify, setModalVerify] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  console.log(history);

  useEffect(() => {
    let intervalId;

    if (props.doc.loading) {
      intervalId = checkLoading();
    }

    if (intervalId) return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (document) {
      togglePdfModal();
    }
  }, [document]);

  const getProofA = () => {
    dispatch(getProof(props.doc.id));
    toggleVerifyPay();
  };

  const getDocuments = () => {
    const envelope_id = props.doc.envelope_id;
    if (process.env.REACT_APP_DOCUMENTS) {
      axios
        .get(`${process.env.REACT_APP_DOCUMENTS}/${envelope_id}`)
        .then(res => {
          const data = Buffer.from(res.data.document.data).toString();
          setDocument(data);
        })
        .catch(err => console.log(err));
    } else {
      axios
        .get(`http://localhost:9000/documents/${envelope_id}`)
        .then(res => setDocument(res.data.document))
        .catch(err => console.log(err));
    }
  };

  const toggleLinkModal = () => setModalLink(!modalLink);
  const togglePdfModal = () => setModalPdf(!modalPdf);
  const toggleVerifyPay = () => setModalVerify(!modalVerify);

  const checkLoading = () => {
    const interval = setInterval(() => {
      let host;
      if (process.env.REACT_APP_CHAINPOINT) {
        host = process.env.REACT_APP_CHAINPOINT;
      } else {
        host = 'http://localhost:9000/chainpoint';
      }

      const promise = axios.get(`${host}/${props.doc.id}/loading`);

      promise
        .then(res => {
          if (!res.data.loading) {
            dispatch(updateLoading(props.doc.id, res.data));
            clearInterval(interval);
          }
        })
        .catch(() => clearInterval(interval));
    }, 5000);

    return interval;
  };

  // Removes "Please DocuSign: " from file title
  const docuSignSubject = props.doc.subject;
  const cutDocSignTitle = docuSignSubject.replace(/Please DocuSign: /, '');

  // Timestamp of BTC proof
  let timestamp;

  if (props.doc.verified) {
    const verified_proof = JSON.parse(props.doc.verified_proof);
    timestamp = verified_proof.verifiedAt;
  }

  return (
    <DocumentContainer>
      <LinkModal doc={props.doc} toggle={toggleLinkModal} isOpen={modalLink} />

      <VerifyModal
        toggle={toggleVerifyPay}
        isOpen={modalVerify}
        getProof={getProofA}
      />

      <PDFModal
        doc={props.doc}
        toggle={togglePdfModal}
        isOpen={modalPdf}
        document={document}
      />

      {props.doc.status === 'completed' &&
      !props.doc.verified &&
      !props.doc.waiting ? (
        <DocumentProof
          onClick={
            props.user.credits <= 0
              ? () => history.push('/buy')
              : toggleVerifyPay
          }
        >
          {props.doc.loading && !props.doc.error ? (
            <LoadingContainer>
              <BeatLoader color={'black'} sizeUnit={'px'} size={10} />
            </LoadingContainer>
          ) : props.doc.error ? (
            'Error'
          ) : (
            'Click to Proof'
          )}
        </DocumentProof>
      ) : (
        <DocumentProof onClick={props.doc.verified ? toggleLinkModal : null}>
          {props.doc.verified
            ? 'See Proof'
            : props.doc.waiting
            ? 'Waiting...'
            : 'Not signed'}
        </DocumentProof>
      )}
      <ProofDocTextContainer>
        <DocumentSubject onClick={getDocuments}>
          {cutDocSignTitle} <PreviewIcon className="fas fa-search" />
        </DocumentSubject>
        {/* Returns proofed timestamp if exists */}
        {timestamp !== undefined ? (
          <TimestampContainer>
            Proofed
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
};

export default Document;
