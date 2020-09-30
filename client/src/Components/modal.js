import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slides from './carousel';

const ModalExample = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
    <div>
      <Button color="info" onClick={toggle}>?</Button>
      <div className="modal">
        <Modal isOpen={modal} toggle={toggle} style={{color: 'black'}}>
          <ModalHeader
          toggle={toggle} 
          close={closeBtn}
          style={{color: 'black'}}>
            What's PlayLits?
          </ModalHeader>
          <ModalBody>
              <Slides/>
          </ModalBody>
        </Modal>
      </div>
      
    </div>
  );
}

export default ModalExample;