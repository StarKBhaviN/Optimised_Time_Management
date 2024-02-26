import React from 'react'
import "../Styles/Signup.css"

function Signup() {
  return (
    <div className='outerSignup'>
        <div class="wrapper">
        <form action="">
            <h1>Register</h1>
            <div class="input-box">
                <input class="inp" type="text" required/>
                <label>Name</label>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
                <input class="inp" type="text" required/>
                <label>Email</label>
                <i class='bx bxs-envelope'></i>
                
            </div>
            <div class="input-box">
                <input type="password" required/>
                <label>Password</label>
                <i class='bx bx-lock'></i>
            </div>
            
            <div class="gender">
                <h3>Gender</h3>
                <div class="inpGender">

                    <label id="Male"><input name="gender" type="radio"/>Male</label>
                    <label id="Female"><input name="gender" type="radio"/>Female</label>
                </div>
            </div>
            
            <div class="input-box">
                <input class="inp" type="text" required/>
                <label>Phone No.</label>
                <i class='bx bxs-phone'></i>
            </div>
            <div class="input-box">
                <input class="inp" type="text" required/>
                <label>Hobby</label>
                <i class='bx bxs-bookmarks'></i>
            </div>

            <button type="Submit" class="btn">Sign-up</button>
        </form>
    </div>
    </div>
  )
}

export default Signup
