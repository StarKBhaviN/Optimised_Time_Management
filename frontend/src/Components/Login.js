import React from 'react'
import "../Styles/Login.css"

function Login() {
  return (
    <div className='pageLogin'>
      <div class="wrapper">
        <form action="">
          <h1>Login</h1>
          <div class="input-box">
            <input class="inp" type="text" required />
            <label>Username</label>
            <i class='bx bxs-user'></i>
          </div>
          <div class="input-box">
            <input type="password" required />
            <label>Password</label>
            <i class='bx bx-lock'></i>
          </div>

          {/* <div class="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forget password?</a>
          </div> */}

          <button type="Submit" class="btn">Login</button>

          <div class="register-link">
            <p>Don't have an account? <a href="/SignUp">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
