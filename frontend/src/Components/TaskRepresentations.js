import { React } from "react";
import "../Styles/TaskRepresentation.css";
import Table from "react-bootstrap/Table";

function TaskRepresentations({ taskData }) {
  const taskDataCpy = [...taskData];
  return (
    <>
      <div className="task_main">
        <h2 className="mb-4" style={{ marginTop: "34px" }}>
          Matrix Representation
        </h2>

        <div className="areaSetter">
          <Table bordered>
            <thead>
              <tr>
                <th className="w-0">#</th>
                <th className="w-50">Urgent</th>
                <th className="w-50">Not Urgent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontWeight: "700",
                  }}
                >
                  Important
                </td>
                <td style={{ padding: "0px" }}>
                  <div className="urg_imp tblDivs">
                    <p className="pt-2" style={{ color: "rgb(208, 238, 171)" }}>
                      Quadrant #1:
                      <br />
                      Necessity Key Action: Manage Common Activities:
                    </p>

                    <div className="listViewInner">
                      <ol className="text-start">
                        {taskDataCpy.length !== 0 ? (
                          taskDataCpy
                            .sort(
                              (a, b) =>
                                new Date(a.Due_date) - new Date(b.Due_date)
                            )
                            .filter(
                              (task) =>
                                task.Urgency === true &&
                                task.Importance === true
                            )
                            .map((task, index) => {
                              const dueDate = new Date(task.Due_date);
                              const currentDate = new Date();
                              const remainingDays = Math.ceil(
                                (dueDate - currentDate) / (1000 * 60 * 60 * 24)
                              );
                              return (
                                <li key={index}>
                                  {task.Title}{" "}
                                  <span style={{ color: "rgb(109, 122, 142)" }}>
                                    |
                                  </span>
                                  {remainingDays <= 0 ? (
                                    <p
                                      style={{
                                        color: "red",
                                        display: "inline",
                                      }}
                                    >
                                      {" "}
                                      Expired
                                    </p>
                                  ) : remainingDays === 1 ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightblue",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Day left...{" "}
                                    </p>
                                  ) : isNaN(remainingDays) ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgrey",
                                      }}
                                    >
                                      {" "}
                                      No data found{" "}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgreen",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Days left...{" "}
                                    </p>
                                  )}
                                </li>
                              );
                            })
                        ) : (
                          <>
                            <li>Crisis</li>
                            <li>Last minute preparations</li>
                            <li>Pressing problems</li>
                            <li>Medical emergencies</li>
                          </>
                        )}
                      </ol>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0px" }}>
                  <div className="nurg_imp tblDivs">
                    <p className="pt-2" style={{ color: "rgb(208, 238, 171)" }}>
                      Quadrant #2:
                      <br />
                      Quality Time Key Action: Focus
                    </p>

                    <div className="listViewInner">
                      <ol className="text-start">
                        {taskDataCpy.length !== 0 ? (
                          taskDataCpy
                            .sort(
                              (a, b) =>
                                new Date(a.Due_Date) - new Date(b.Due_Date)
                            )
                            .filter(
                              (task) =>
                                task.Urgency === false &&
                                task.Importance === true
                            )
                            .map((task, index) => {
                              const dueDate = new Date(task.Due_date);
                              const currentDate = new Date();
                              const remainingDays = Math.ceil(
                                (dueDate - currentDate) / (1000 * 60 * 60 * 24)
                              );
                              return (
                                <li key={index}>
                                  {task.Title}{" "}
                                  <span style={{ color: "rgb(208, 238, 171)" }}>
                                    |
                                  </span>
                                  {remainingDays <= 0 ? (
                                    <p
                                      style={{
                                        color: "red",
                                        display: "inline",
                                      }}
                                    >
                                      {" "}
                                      Expired
                                    </p>
                                  ) : remainingDays === 1 ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightblue",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Day left...{" "}
                                    </p>
                                  ) : isNaN(remainingDays) ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgrey",
                                      }}
                                    >
                                      {" "}
                                      No data found{" "}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgreen",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Days left...{" "}
                                    </p>
                                  )}
                                </li>
                              );
                            })
                        ) : (
                          <>
                            <li>Value Clarification</li>
                            <li>Empowerment</li>
                            <li>Coaching and Mentoring</li>
                            <li>True Recreation</li>
                          </>
                        )}
                      </ol>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontWeight: "700",
                  }}
                >
                  Not Important
                </td>
                <td style={{ padding: "0px" }}>
                  <div className="urg_nimp tblDivs">
                    <p className="pt-2" style={{ color: "rgb(208, 238, 171)" }}>
                      Quadrant #3:
                      <br />
                      Deception Key Action: Caution
                    </p>

                    <div className="listViewInner">
                      <ol className="text-start">
                        {taskDataCpy.length !== 0 ? (
                          taskDataCpy
                            .sort(
                              (a, b) =>
                                new Date(a.Due_date) - new Date(b.Due_date)
                            )
                            .filter(
                              (task) =>
                                task.Urgency === true &&
                                task.Importance === false
                            )
                            .map((task, index) => {
                              const dueDate = new Date(task.Due_date);
                              const currentDate = new Date();
                              const remainingDays = Math.ceil(
                                (dueDate - currentDate) / (1000 * 60 * 60 * 24)
                              );
                              return (
                                <li key={index}>
                                  {task.Title}{" "}
                                  <span style={{ color: "rgb(208, 238, 171)" }}>
                                    |
                                  </span>
                                  {remainingDays <= 0 ? (
                                    <p
                                      style={{
                                        color: "red",
                                        display: "inline",
                                      }}
                                    >
                                      {" "}
                                      Expired
                                    </p>
                                  ) : remainingDays === 1 ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightblue",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Day left...{" "}
                                    </p>
                                  ) : isNaN(remainingDays) ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgrey",
                                      }}
                                    >
                                      {" "}
                                      No data found{" "}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgreen",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Days left...{" "}
                                    </p>
                                  )}
                                </li>
                              );
                            })
                        ) : (
                          <>
                            <li>
                              Meeting other people’s priorities and expectations
                            </li>
                            <li>Urgency masquerading as importance</li>
                            <li>Frequent Interruptions</li>
                          </>
                        )}
                      </ol>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0px" }}>
                  <div className="urg_nimp tblDivs">
                    <p className="pt-2" style={{ color: "rgb(208, 238, 171)" }}>
                      Quadrant #4:
                      <br />
                      Waste Key Action: Avoid
                    </p>

                    <div className="listViewInner">
                      <ol className="text-start">
                        {taskDataCpy.length !== 0 ? (
                          taskDataCpy
                            .sort(
                              (a, b) =>
                                new Date(a.Due_date) - new Date(b.Due_date)
                            )
                            .filter(
                              (task) =>
                                task.Urgency === false &&
                                task.Importance === false
                            )
                            .map((task, index) => {
                              const dueDate = new Date(task.Due_date);
                              const currentDate = new Date();
                              const remainingDays = Math.ceil(
                                (dueDate - currentDate) / (1000 * 60 * 60 * 24)
                              );
                              return (
                                <li key={index}>
                                  {task.Title}{" "}
                                  <span style={{ color: "rgb(208, 238, 171)" }}>
                                    |
                                  </span>
                                  {remainingDays <= 0 ? (
                                    <p
                                      style={{
                                        color: "red",
                                        display: "inline",
                                      }}
                                    >
                                      {" "}
                                      Expired
                                    </p>
                                  ) : remainingDays === 1 ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightblue",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Day left...{" "}
                                    </p>
                                  ) : isNaN(remainingDays) ? (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgrey",
                                      }}
                                    >
                                      {" "}
                                      No data found{" "}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        display: "inline",
                                        color: "lightgreen",
                                      }}
                                    >
                                      {" "}
                                      {remainingDays} Days left...{" "}
                                    </p>
                                  )}
                                </li>
                              );
                            })
                        ) : (
                          <>
                            <li>Gossip</li>
                            <li>Junk E-mail</li>
                            <li>Hanging out with fake friends</li>
                            <li>Keeping people happy</li>
                          </>
                        )}
                      </ol>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default TaskRepresentations;
