import React from 'react'
import "../Styles/About.css"

function About() {
    return (
        <>
            <div className='aboutOuter'>
                <div className="setWidth">
                    <h2>Time Management Matrix</h2>

                    <div className="quads">
                        <div className="quad">
                            <img src="" alt="" />
                            <p>Urgent and <br/> Important</p>
                        </div>
                        <div className="quad">
                            <img src="" alt="" />
                            <p>Not Urgent and <br/> Important</p>
                        </div>
                        <div className="quad">
                            <img src="" alt="" />
                            <p>Urgent and <br/> Not Important</p>
                        </div>
                        <div className="quad">
                            <img src="" alt="" />
                            <p>Not Urgent and <br/> Not Important</p>
                        </div>
                    </div>
                </div>

                <div className="explanation setWidth">
                    <h2>What is the Time Management Matrix?</h2>

                    <div className='w-75' style={{border : "2px solid red"}}>
                        <p>
                            A time management matrix is a powerful tool for categorizing tasks based on their urgency and importance. It helps individuals and businesses to prioritize their activities effectively in order to maximize productivity and facilitate goal achievement. The matrix divides tasks into four quadrants based on importance and urgency.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
