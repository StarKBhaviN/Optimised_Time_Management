import React from 'react';
import "../Styles/Navbar.css";

function Navbar() {

    return (
        <>
            <div className='navDiv'>
                <nav className='navStyle' >
                    <i className='fa-solid fa-arrow-right' style={{ marginLeft: "25px" }}></i>
                    <a className="clsHome cmnLink ms-3 animApply animNavText" href="#home">Home</a>
                    <a className="clsAbout cmnLink ms-3 animApply animNavText" href="#about">About</a>
                    <div className="btnSetNav" style={{ border: "0px solid red" }}>
                        <div className='setBtnNav cmnBtn btnSignIn me-4'><a className="clsSignIn innerLink animApply animNavText" href="/login">Sign In</a></div>
                        <div className='setBtnNav cmnBtn btnJoinUs'><a className="clsJoinUs innerLink animApply animNavText" href="#addTask">Add Task</a></div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
