import React, { useState, useEffect } from "react";
import "../Styles/taskAddViewOuter.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { taskAddSchema } from "../validation_schema";
import TaskRepresentations from "./TaskRepresentations";
import TaskAddModal from "../Modals/TaskAddModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faTry,
} from "@fortawesome/free-solid-svg-icons";
import DeleteTaskModal from "../Modals/DeleteTaskModal";

const initialValues = {
  Title: "",
  Due_date: "",
  Notification_period: "",
  Urgency: false,
  Importance: false,
  Description: "",
};

const isWithinNotificationPeriod = (dueDate, notificationPeriod) => {
  const dueDateObj = new Date(dueDate);
  const today = new Date();
  const diffTime = dueDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  return diffDays <= notificationPeriod;
};

function TaskAddView({ auth_token_id }) {
  const [tokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);
  const [delShow, setDelShow] = useState(false);
  const [writeMode, setWriteMode] = useState("Add");
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTaskBtn, setDeleteTaskBtn] = useState(false);

  const handleClose = () => setShow(false);
  const handleDelClose = () => setDelShow(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleDelShow = () => {
    setDelShow(true);
  };

  const btnAddTaskClicked = () => {
    setWriteMode("Add");
    handleShow();
  };

  const btnDelTaskClicked = () => {
    handleDelShow();
  };

  useEffect(() => {
    const token = localStorage.getItem("OTM_Token");
    setTokenFound(!!token);
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task); // Update selectedTask state when a task is clicked
  };

  console.log(selectedTask);

  const [taskAddBtn, setTaskAddBtn] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: taskAddSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response =
          writeMode === "Add"
            ? await axios.post(
                "http://127.0.0.1:5000/api/tasks/task_add",
                values,
                {
                  headers: {
                    Authorization: `Bearer ${auth_token_id}`,
                  },
                }
              )
            : await axios.put(
                `http://127.0.0.1:5000/api/tasks/task_update/${selectedTask._id.$oid}`,
                values,
                {
                  headers: {
                    Authorization: `Bearer ${auth_token_id}`,
                  },
                }
              );

        if (response) {
          toast.success(
            writeMode === "Add"
              ? "Task Added Successfully!!!"
              : "Task Edited Successfully!!!",
            {
              position: "bottom-left",
            }
          );

          handleNotiTaskSelection(values, values.Notification_period);
          handleClose();
          resetForm();
          setTaskAddBtn(true);
        }
      } catch (error) {
        console.error("Error occurred:", error.response.data.error);
        toast.error(`${error.response.data.error}`, {
          position: "bottom-left",
        });
      }
    },
  });

  const errorMessage = Object.values(errors);

  const showToastMessage = () => {
    errorMessage.map((er) => {
      toast.warning(`${er}`, {
        position: "bottom-left",
      });
    });
    handleClose();
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

  const delTask = async (task) => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/api/tasks/task_del/${task._id.$oid}`,
        {
          headers: {
            Authorization: `Bearer ${auth_token_id}`,
          },
        }
      );
      toast.error("Task Deleted Successfully!!!", {
        position: "bottom-left",
      });

      setDatas((prevData) =>
        prevData.filter((item) => item._id.$oid !== task._id.$oid)
      );
    } catch (error) {
      console.error("Error Deleting Task");
    }
  };

  const [notificationTasks, setNotificationTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("OTM_Token");
    setTokenFound(!!token);

    if (token) {
      datas();
      notificationTasks.forEach(({ task, notificationPeriod }) => {
        if (isWithinNotificationPeriod(task.Due_date, notificationPeriod)) {
          // Schedule notification for tasks within the notification period
          toast.info(`Task '${task.Title}' is due soon.`);
        }
      });
    }
    setTaskAddBtn(false);
    setDeleteTaskBtn(false);
  }, [deleteTaskBtn, taskAddBtn, auth_token_id, notificationTasks]);

  
  const handleNotiTaskSelection = (task, notificationPeriod) => {
    // Toggle selection status
    const isSelected = notificationTasks.some(
      (selectedTask) => selectedTask.task._id === task._id
    );
    if (isSelected) {
      // Remove from selected tasks
      const updatedSelectedTasks = notificationTasks.filter(
        (selectedTask) => selectedTask.task._id !== task._id
      );
      setNotificationTasks(updatedSelectedTasks);
    } else {
      // Add to selected tasks
      setNotificationTasks([
        ...notificationTasks,
        { task, notificationPeriod },
      ]);
    }
  };

  useEffect(() => {
    // Retrieve selected tasks from local storage on component mount
    const storedSelectedTasks = JSON.parse(
      localStorage.getItem("selectedTasks")
    );
    if (storedSelectedTasks) {
      setNotificationTasks(storedSelectedTasks);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("OTM_Token");
    if (token) {
      // Schedule notifications for selected tasks on login
      notificationTasks.forEach(({ task, notificationPeriod }) => {
        if (isWithinNotificationPeriod(task.Due_date, notificationPeriod)) {
          // Schedule notification for tasks within the notification period
          // Example: You can use a library like 'react-toastify' to show notifications
          toast.info(`Task '${task.Title}' is due soon.`);
        }
      });
    }
  }, [auth_token_id, notificationTasks]);

  
  console.log(notificationTasks)
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "sticky",
                }}
              >
                <Button
                  className="btnAddTask mb-2"
                  variant="primary"
                  style={{ visibility: tokenFound ? "visible" : "hidden" }}
                  onClick={btnAddTaskClicked}
                >
                  Add Task
                </Button>

                <h5>List View :-</h5>
              </div>
              <div
                className="allTasks"
                style={{ overflowY: "scroll", width: "100%" }}
              >
                <ol className="text-start">
                  {tokenFound ? (
                    getData.map((task, index) => (
                      <div
                        style={{
                          border: "0px solid red",
                          width: "98%",
                          display: "flex",
                          alignItems: "center ",
                          justifyContent: "space-between",
                        }}
                        key={index}
                      >
                        <li
                          style={{ maxWidth: "90%", border: "0px solid green" }}
                          className="dynamicLi"
                          key={index}
                          onClick={() => {
                            handleTaskClick(task);
                          }}
                        >
                          {task.Title}
                        </li>

                        <div
                          style={{
                            border: "0px solid green",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "38px",
                          }}
                        >
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faPenToSquare}
                            onClick={() => {
                              setWriteMode("Edit");
                              handleTaskClick(task);
                              handleShow();
                            }}
                          />
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faTrash}
                            onClick={() => {
                              handleTaskClick(task);
                              handleDelShow();
                              setDeleteTaskBtn(true);
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <li>Sign in required to add tasks</li>
                      <li>Sign in required to add tasks</li>
                      <li>Sign in required to add tasks</li>
                      <li>Sign in required to add tasks</li>
                    </>
                  )}
                </ol>
              </div>
            </div>

            <div className="aboutTask">
              <h3>Task Description</h3>
              <p style={{ color: "rgb(131,131,131)" }}>
                {!selectedTask
                  ? "Select a task to view its Description..."
                  : selectedTask.Description === ""
                  ? "No Description found..."
                  : selectedTask.Description}
              </p>
            </div>
          </div>
        </div>
        <TaskAddModal
          show={show}
          writeMode={writeMode}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          showToastMessage={showToastMessage}
          handleNotiTaskSelection={handleNotiTaskSelection}
        />
        <DeleteTaskModal
          delShow={delShow}
          handleDelClose={handleDelClose}
          showToastMessage={showToastMessage}
          delTask={delTask}
          selectedTask={selectedTask}
        />
      </div>

      <TaskRepresentations taskData={getData} />
    </>
  );
}
// handleNotiTaskSelection(task, task.Notification_period);

export default TaskAddView;
