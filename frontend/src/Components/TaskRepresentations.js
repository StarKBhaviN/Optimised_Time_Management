import React from 'react'
import "../Styles/TaskRepresentation.css"
import Table from 'react-bootstrap/Table';

function TaskRepresentations() {
    return (
        <>
            <div className="task_main">
                <h2 className='mb-4' style={{marginTop : "34px"}}>Matrix Representation</h2>

                <div className='areaSetter'>
                    <Table bordered >
                        <thead>
                            <tr>
                                <th className="w-0"></th>
                                <th className='w-50'>Urgent</th>
                                <th className='w-50'>Not Urgent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Important</td>
                                <td>
                                    <div className="urg_imp tblDivs">
                                        <p>Quadrant #1:<br />Necessity Key Action: Manage Common Activities:</p>

                                        <ul className="text-start">
                                            <li>Crisis</li>
                                            <li>Last minute preparations</li>
                                            <li>Pressing problems</li>
                                            <li>Medical emergencies</li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <div className="nurg_imp tblDivs">
                                        <p>Quadrant #2:<br />Quality Time Key Action: Focus</p>
                                        <ul className="text-start">
                                            <li>Value Clarification</li>
                                            <li>Empowerment</li>
                                            <li>Coaching  and Mentoring</li>
                                            <li>True Recreation</li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Not Important</td>
                                <td>
                                    <div className="urg_nimp tblDivs">
                                        <p>Quadrant #3:<br />Deception Key Action: Caution</p>

                                        <ul className="text-start">
                                            <li>Meeting other people’s priorities and expectations</li>
                                            <li>Urgency masquerading as importance</li>
                                            <li>Frequent Interruptions</li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <div className="urg_nimp tblDivs">
                                        <p>Quadrant #4:<br />Waste Key Action: Avoid</p>

                                        <ul className="text-start">
                                            <li>Gossip</li>
                                            <li>Junk E-mail</li>
                                            <li>Hanging out with fake friends</li>
                                            <li>Keeping people happy</li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default TaskRepresentations
