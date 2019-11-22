import React, { useEffect } from 'react';
import PDFObject from 'pdfobject';
import { Modal } from 'reactstrap';
import { ModalPDF } from './styles/DocumentModalStyles';

const PDFModal = props => {
  useEffect(() => {
    const data = `data:application/pdf;base64,${props.document}`;
    PDFObject.embed(data, `#pdf_subject${props.doc.id}`);
  }, [props.isOpen]);

  const { doc, toggle, isOpen, document } = props;
  if (!document || !isOpen) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalPDF id={`pdf_subject${doc.id}`} />
    </Modal>
  );
};

export default PDFModal;
