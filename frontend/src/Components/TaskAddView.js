import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "../Styles/taskAddViewOuter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TaskAddView() {
  const [tokenFound, setTokenFound] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if token is found (You need to implement your token checking logic here)
    const token = localStorage.getItem("token"); // Example: Check if token exists in localStorage
    setTokenFound(!!token); // Set tokenFound based on whether token exists or not
  }, []);

  const handleAddTaskClick = () => {
    console.log("Button clicked")
    setShowModal(true); // Show the modal when "Add Task" button is clicked
  };

  // <script>
  //   $("#exampleModal").on("show.bs.modal", function (event) {
  //     var button = $(event.relatedTarget); // Button that triggered the modal
  //     var recipient = button.data("whatever"); // Extract info from data-* attributes
  //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  //     var modal = $(this);
  //     modal.find(".modal-title").text("New message to " + recipient);
  //     modal.find(".modal-body input").val(recipient);
  //   });
  // </script>

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
              {tokenFound && <Button variant="primary mb-2">Add Task</Button>}
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
        <Button variant="primary mb-2" onClick={handleAddTaskClick}>
          Add Task
        </Button>
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add the Task
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskAddView;
