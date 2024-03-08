import React from 'react'
import "../Styles/Login.css"
import axios from "axios"
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { loginSchema } from '../validation_schema';
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const initialValues = {
    Email: "",
    Password: "",
  }

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/user/login", {
          Email: values.Email,
          Password: values.Password
        });

        console.log(response)
        if (response.data) {
          localStorage.setItem('OTM_Token', response.data.access_token);
          toast.success("Logged In Successfully!!!", {
            position: 'bottom-left'
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error occurred:", error.response.data.error);
        toast.error(`${error.response.data.error}`, {
          position: 'bottom-left'
        });
      }

      action.resetForm()
    }
  })

  console.log(errors)

  const errorMessage = Object.values(errors)

  const showToastMessage = () => {
    errorMessage.map((er) => {
      toast.warning(`${er}`, {
        position: "bottom-left"
      })
    })

  };

  return (
    <div className='pageLogin'>
      <div className="wrapper">
        <form autoComplete='off' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              className="inp"
              type="email"
              id='email'
              name='Email'
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label>Username</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name='Password'
              value={values.Password}
              onChange={handleChange}
              onBlur={handleBlur}

            />
            <label>Password</label>
            <i className='bx bx-lock'></i>
          </div>

          <button type='submit' className="btn" onClick={showToastMessage}>Login</button>

          <div className="register-link">
            <p>Don't have an account? <a href="/SignUp">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
