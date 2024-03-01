import React, { useState, useEffect } from "react";
import "../Styles/taskAddViewOuter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { taskAddSchema } from "../validation_schema";
import TaskRepresentations from "./TaskRepresentations";

const initialValues = {
  Title: "",
  Due_date: "",
  Urgency: false,
  Importance: false,
  Description: ""
}

function TaskAddView({ auth_token_id }) {
  const [tokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const token = localStorage.getItem("OTM_Token");
    setTokenFound(!!token);
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task); // Update selectedTask state when a task is clicked
  };

  const [taskAddBtn, setTaskAddBtn] = useState(false)

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: taskAddSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/tasks/task_add",
          {
            Title: values.Title,
            Due_date: values.Due_date,
            Urgency: values.Urgency,
            Importance: values.Importance,
            Description: values.Description,
          },
          {
            headers: {
              Authorization: `Bearer ${auth_token_id}`,
            },
          }
        );

        if (response) {
          toast.success("Task Added Successfully!!!", {
            position: "bottom-left",
          });

          setTaskAddBtn(true)
        }
      } catch (error) {
        console.error("Error occurred:", error.response.data.error);
        toast.error(`${error.response.data.error}`, {
          position: "bottom-left",
        });
      }

      action.resetForm();
    },
  });

  const errorMessage = Object.values(errors)

  const showToastMessage = () => {
    errorMessage.map((er) => {
      toast.warning(`${er}`, {
        position: "bottom-left"
      })
    })
    handleClose()
  };


  const [getData, setDatas] = useState([]);

  const datas = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/tasks/get_all_tasks",
        {
          headers: {
            Authorization: `Bearer ${auth_token_id}`,
          },
        }
      );

      setDatas(response.data);
    } catch (error) {
      console.error("Error occurred:", error.response.data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("OTM_Token");
    setTokenFound(!!token);

    if (token) {
      datas();
    }
    setTaskAddBtn(false)
  }, [taskAddBtn, auth_token_id]);

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
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "sticky" }}>

                <Button className="btnAddTask mb-2" variant="primary" style={{ visibility: tokenFound ? "visible" : "hidden" }} onClick={handleShow}>
                  Add Task
                </Button>

                <h5>List View :-</h5>
              </div>
              <div className="allTasks" style={{ overflowY: "scroll", width: "100%" }}>
                <ol className="text-start">
                  {
                    tokenFound ?
                      getData.map((task, index) => (
                        <li className="dynamicLi" key={index} onClick={() => handleTaskClick(task)}>
                          {task.Title}
                          {/* {tokenFound && (
                          <FontAwesomeIcon icon={faTrash} className="ms-2" />
                        )} */}
                        </li>
                      )) :
                      (
                        <>
                          <li>Sign in required to add tasks</li>
                          <li>Sign in required to add tasks</li>
                          <li>Sign in required to add tasks</li>
                          <li>Sign in required to add tasks</li>
                        </>
                      )
                  }
                </ol>
              </div>
            </div>

            <div className="aboutTask">
              <h3>Task Description</h3>
              <p style={{ color: "rgb(131,131,131)" }}>
                {selectedTask ? selectedTask.Description : "Select a task to view its description."}
              </p>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add the Task</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="task">
                <div className="top">
                  <div className="input">
                    <label>Title:</label>
                    <input
                      type="text"
                      name="Title"
                      value={values.Title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="input">
                    <label>Due_Date: </label>
                    <input
                      type="date"
                      name="Due_date"
                      value={values.Due_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="btm">
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
                  </div>

                  <div className="input-desc">
                    <label>Description: </label>
                    <input
                      type="text"
                      name="Description"
                      value={values.Description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={showToastMessage}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>

      <TaskRepresentations taskData={getData} />
    </>
  );
}

export default TaskAddView;
