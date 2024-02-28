import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "../Styles/taskAddViewOuter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TaskAddView() {
    const [tokenFound, setTokenFound] = useState(false);

    useEffect(() => {
        // Check if token is found (You need to implement your token checking logic here)
        const token = localStorage.getItem('token'); // Example: Check if token exists in localStorage
        setTokenFound(!!token); // Set tokenFound based on whether token exists or not
    }, []);

    return (
        <>
            <div className="taskAddViewOuter" id='addTask'>
                <div className="widthSet">
                    <h2 className='text-center mb-4' style={{ marginTop: "44px" }}>Your ToDo's</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "44px", width: "100%" }}>
                        <div className="tasks">
                            {tokenFound && <Button variant="primary mb-2">Add Task</Button>}
                            <h5>List View :-</h5>
                            <div className="allTasks">
                                <ol className='text-start'>
                                    <li>Sign In {tokenFound && <FontAwesomeIcon icon={faTrash} className='ms-2' />}</li>
                                    <li>Sign In {tokenFound && <FontAwesomeIcon icon={faTrash} className='ms-2' />}</li>
                                    <li>Sign In {tokenFound && <FontAwesomeIcon icon={faTrash} className='ms-2' />}</li>
                                    <li>Sign In {tokenFound && <FontAwesomeIcon icon={faTrash} className='ms-2' />}</li>
                                </ol>
                            </div>
                        </div>

                        <div className="aboutTask">
                            <h3>Task Description</h3>
                            <p style={{ color: "rgb(131,131,131)" }}>
                                {tokenFound ?
                                    `"Task description when token is found"` :
                                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dignissimos blanditiis repellendus architecto enim minus laudantium dolorum soluta cumque, nesciunt dolorem voluptatibus molestiae cupiditate! Accusamus facere quae corporis, repudiandae ipsum sequi itaque eligendi doloribus!"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskAddView;
