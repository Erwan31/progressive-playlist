import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slides from './carousel';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
         toggle={toggle}
         >What's PlayLits?</ModalHeader>
        <ModalBody>
            <Slides/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalExample;