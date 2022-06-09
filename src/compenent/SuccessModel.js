import React from "react";
import { Modal,Button } from "react-bootstrap"

const SuccessModal=()=>{
    return(
        <Modal  show={true} onHide={true}>
        
        <Modal.Body>The Operation is Succes</Modal.Body>
        <Modal.Footer>
          <Button variant="success" href="/" >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    )

}
export default SuccessModal;