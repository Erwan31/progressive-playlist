import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Slides from './carousel';

const ModalExample = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" 
                           onClick={toggle} 
                           style={{
                             color: 'darkgray', 
                             fontStyle: 'bold', 
                             fontSize: '3rem'}}
                    >
                      &times;
                    </button>;

  return (
    <>
      <Button color="info" onClick={toggle} size="lg">?</Button>
      {/* Issue in here with the production build -> why???? */
        modal && 
        <div className="modal">
          <Modal isOpen={modal} toggle={toggle} style={{color: 'black'}}>
            <ModalHeader
            toggle={toggle} 
            close={closeBtn}>
            <div style={{color: 'darkgray', fontStyle: 'bold', fontSize: '3rem'}}>What's PlayLits?</div>
            </ModalHeader>
            <ModalBody>
              <Slides/>
            </ModalBody>
          </Modal>
        </div>
      } 
    </>
  );
}

export default ModalExample;