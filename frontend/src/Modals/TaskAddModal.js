import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function TaskAddModal({
  show,
  writeMode,
  handleClose,
  handleSubmit,
  values,
  handleChange,
  handleBlur,
  showToastMessage,
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${
            writeMode === "Add" ? "Add" : "Edit"
          } The Task`}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{border : "0px solid green", height : "225px"}}>
            <div className="task" style={{ border: "0px solid red" }}>
              <div className="top">
                <div className="input">
                  <label className="mb-2">Title:</label>
                  <input
                    type="text"
                    name="Title"
                    value={values.Title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="input">
                  <label className="mb-2">Due_Date: </label>
                  <input
                    type="date"
                    name="Due_date"
                    value={values.Due_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="btm" style={{ border: "0px solid purple" }}>
                <div className="inpBox">
                  <div className="box1">
                    <label>Urgency: </label>
                    <input
                      type="checkbox"
                      name="Urgency"
                      checked={values.Urgency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="box2">
                    <label>Importance: </label>
                    <input
                      type="checkbox"
                      name="Importance"
                      checked={values.Importance}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="input" style={{border : "0px solid red", width : "420px"}}>
                    <label className="mb-2">
                      Notification <br/>Period (indays) : {" "}
                    </label>
                    <input
                      type="number"
                      name="Notification_period"
                      value={values.Notification_period}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="input_desc">
                  <label className="mb-2">Description: </label>
                  <textarea
                    name="Description"
                    value={values.Description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter description here..."
                    style={{
                      border: "1px solid black",
                      borderRadius: "12px",
                      height: "50px",
                      width: "100%",
                      outline: "1px solid grey",
                      overflow: "auto",
                      padding: "2px 6px ",
                      lineHeight: "1.1",
                      resize: "none",
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={showToastMessage}>
              {writeMode === "Add" ? "Add Task" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskAddModal;
