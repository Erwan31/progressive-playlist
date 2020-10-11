import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Slides from './carousel';

const ModalDisplay = (props) => {

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
      <Button 
        className="questionMark" 
        onClick={toggle} 
        size="lg"
        style={{
          border: "0",
          background: "transparent"
        }}
      >
        <div className="questionMark">?</div>
      </Button>
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

export default ModalDisplay;