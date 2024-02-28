import React from 'react'
import Button from 'react-bootstrap/Button';
import "../Styles/taskAddViewOuter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function TaskAddView() {
    return (
        <>
            <div className="taskAddViewOuter" id='addTask'>
                <div className="widthSet">

                    <h2 className='text-center mb-4' style={{marginTop : "44px"}}>Your ToDo's</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom : "44px" }}>

                        <div className="tasks">
                            <Button variant="primary mb-2">Add Task</Button>{' '}

                            <h5>List View :-</h5>
                            <div className="allTasks">

                                <ol className='text-start'>
                                    <li>Sign In <FontAwesomeIcon icon={faTrash} className='ms-2'/></li>
                                    <li>Sign In <FontAwesomeIcon icon={faTrash} className='ms-2'/></li>
                                    <li>Sign In <FontAwesomeIcon icon={faTrash} className='ms-2'/></li>
                                    <li>Sign In <FontAwesomeIcon icon={faTrash} className='ms-2'/></li>
                                </ol>
                            </div>
                        </div>

                        <div className="aboutTask">
                            <h3>Task Description</h3>
                            <p style={{ color: "rgb(131,131,131)" }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel perspiciatis animi expedita nulla dolorum? Quam sunt quae deserunt! Non ullam harum molestias iste consectetur possimus amet cumque reiciendis accusantium laboriosam! Placeat maxime esse quae.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TaskAddView
