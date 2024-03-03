import React, { useState, useEffect } from "react";
import "../Styles/taskAddViewOuter.css";
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { taskAddSchema } from "../validation_schema";
import TaskRepresentations from "./TaskRepresentations";
import TaskAddModal from "../Modals/TaskAddModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faTry } from '@fortawesome/free-solid-svg-icons';


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

  const delTask = (task) => {
    try {
      console.log(task)
      axios.delete(`http://127.0.0.1:5000/api/tasks/task_del/${task._id.$oid}`, {
        headers: {
          Authorization: `Bearer ${auth_token_id}`
        }
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    const token = localStorage.getItem("OTM_Token");
    setTokenFound(!!token);

    if (token) {
      datas();
    }
    setTaskAddBtn(false)
  }, [delTask, taskAddBtn, auth_token_id]);


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
                        <div style={{ border: "0px solid red", width: "98%", display: "flex", alignItems: "center ", justifyContent: "space-between" }}>
                          <li style={{ maxWidth: "90%", border: "0px solid green" }} className="dynamicLi" key={index} onClick={() => handleTaskClick(task)}>
                            {task.Title}
                          </li>

                          <div style={{ border: "0px solid green", display: "flex", justifyContent: "space-between", width: "38px" }}>
                            <FontAwesomeIcon style={{cursor : "pointer"}} icon={faPenToSquare} />
                            <FontAwesomeIcon style={{cursor : "pointer"}} icon={faTrash} onClick={() => delTask(task)} />
                          </div>

                        </div>
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
                {!selectedTask ?
                  "Select a task to view its Description..." :
                  selectedTask.Description === "" ?
                    "No Description found..." :
                    selectedTask.Description
                }
              </p>
            </div>
          </div>
        </div>

        <TaskAddModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} values={values} handleChange={handleChange} handleBlur={handleBlur} showToastMessage={showToastMessage} />
      </div>

      <TaskRepresentations taskData={getData} />
    </>
  );
}

export default TaskAddView;
