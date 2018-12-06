import React from 'react';
import PDFObject from 'pdfobject';
import { Modal } from 'reactstrap';
import { ModalPDF } from './styles/DocumentModalStyles';

class PDFModal extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen) {
      const data = `data:application/pdf;base64,${this.props.document}`;
      PDFObject.embed(data, `#pdf_subject${this.props.doc.id}`);
    }
  }

  render() {
    const { doc, toggle, isOpen, document } = this.props;
    if (!document || !isOpen) return null;

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalPDF id={`pdf_subject${doc.id}`} />
      </Modal>
    );
  }
}

export default PDFModal;
