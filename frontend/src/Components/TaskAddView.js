import React, { useState, useEffect } from "react";
import "../Styles/taskAddViewOuter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TaskAddView() {
  const [tokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    // Check if token is found (You need to implement your token checking logic here)
    const token = localStorage.getItem("OTM_Token"); // Example: Check if token exists in localStorage
    setTokenFound(!!token); // Set tokenFound based on whether token exists or not
  }, []);

  console.log(tokenFound)

  return (
    <>
      <div className="taskAddViewOuter" id="addTask">
        <div className="widthSet">
          <h2 className="text-center mb-4" style={{ marginTop: "44px" }}>
            Your ToDo's
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "44px",
              width: "100%",
            }}
          >
            <div className="tasks">

              {tokenFound && <Button variant="primary" onClick={handleShow}>Add Task</Button>}
              <h5>List View :-</h5>
              <div className="allTasks">
                <ol className="text-start">
                  <li>
                    Sign In{" "}
                    {tokenFound && (
                      <FontAwesomeIcon icon={faTrash} className="ms-2" />
                    )}
                  </li>
                  <li>
                    Sign In{" "}
                    {tokenFound && (
                      <FontAwesomeIcon icon={faTrash} className="ms-2" />
                    )}
                  </li>
                  <li>
                    Sign In{" "}
                    {tokenFound && (
                      <FontAwesomeIcon icon={faTrash} className="ms-2" />
                    )}
                  </li>
                  <li>
                    Sign In{" "}
                    {tokenFound && (
                      <FontAwesomeIcon icon={faTrash} className="ms-2" />
                    )}
                  </li>
                </ol>
              </div>
            </div>

            <div className="aboutTask">
              <h3>Task Description</h3>
              <p style={{ color: "rgb(131,131,131)" }}>
                {tokenFound
                  ? `"Task description when token is found"`
                  : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dignissimos blanditiis repellendus architecto enim minus laudantium dolorum soluta cumque, nesciunt dolorem voluptatibus molestiae cupiditate! Accusamus facere quae corporis, repudiandae ipsum sequi itaque eligendi doloribus!"}
              </p>
            </div>
          </div>
        </div>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add the Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="task">
                <div className="top">
                  <div className="input">
                    <label>Title:</label>
                    <input className="inp" type="text" required />
                  </div>
                  <div className="input">
                    <label>Due_Date: </label>
                    <input type="date" className="inp" required />
                  </div>
                </div>

                <div className="btm">
                  <div className="inpBox">
                    <div className="box1">
                      <label>Urgency: </label>
                      <input type="checkbox" />
                    </div>
                    <div className="box2">
                      <label>Importance: </label>
                      <input type="checkbox" />
                    </div>
                  </div>

                  <div className="input-desc">
                    <label>Description: </label>
                    <input type="text" className="inp" />
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal >
      </div>

    </>
  );
}

export default TaskAddView;
