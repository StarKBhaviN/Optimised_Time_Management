import React from 'react'
import "../Styles/Intro.css"
import Clock from './Clock'

function Intro({ motion }) {
    return (
        <>
            <div className='introOuter' id='home'>
                <div className="curveDesign">
                    <div className="content">
                        <h1 className='text-start'>Optimised Time</h1>
                        <h1 className='text-start'>Management</h1>

                        <p className='text-start' style={{ fontSize: "18px" }}>Time is Money.</p>

                        <button className="btnManage text-left mb-4">
                            HOW TO MANAGE
                        </button>
                    </div>

                    <div className="infoImage">
                        <Clock />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intro
