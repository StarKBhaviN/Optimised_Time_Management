import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteTaskModal({ delShow, handleDelClose, delTask, selectedTask }) {
  // console.log("In delete modal");
  // console.log(delShow);
  // console.log(handleDelClose);
  // console.log(selectedTask._id.$oid);
  return (
    <div>
      <Modal show={delShow} onHide={handleDelClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete task?</p>
            {/* <p>Task : {selectedTask.Title}</p> */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleDelClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                delTask(selectedTask);
                handleDelClose()
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

export default DeleteTaskModal;
