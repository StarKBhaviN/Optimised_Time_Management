import React from 'react'
import axios from 'axios';
import "../Styles/Signup.css"
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { signupSchema } from '../validation_schema';
import { toast } from 'react-toastify';

const initialValues = {
  Name: "",
  Email: "",
  Gender: "",
  Password: "",
  phNo: "",
  Hobby: ""
}

function Signup() {
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/user/create_user", {
          Name: values.Name,
          Email: values.Email,
          Gender: values.Gender,
          Password: values.Password,
          phNo: values.phNo,
          Hobby: values.Hobby
        })

        console.log(response)
        if (response.data) {
          localStorage.setItem('OTM_Token', response.data.access_token);
          toast.success("User Created Successfully!!!", {
            position: 'bottom-left'
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error(`${error.response.data.error}`, {
          position: 'bottom-left'
        });
      }
    }
  })

  console.log(values)
  const errorMessage = Object.values(errors)

  const showToastMessage = () => {
    errorMessage.map((er) => {
      toast.warning(`${er}`, {
        position: "bottom-left"
      })
    })
  };

  return (
    <div className='outerSignup'>
      <div className="wrapper">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              className="inp"
              type="text"
              name='Name'
              value={values.Name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label for="">Name</label>
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              className="inp"
              type="text"
              name='Email'
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label for="">Email</label>
            <i className='bx bxs-envelope'></i>

          </div>
          <div className="input-box">
            <input
              type="password"
              name='Password'
              value={values.Password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label for="">Password</label>
            <i className='bx bx-lock'></i>
          </div>

          <div className="gender">
            <h3>Gender</h3>
            <div className="inpGender">
              <label for="" htmlFor="male">
                <input
                  id="male"
                  name="Gender"
                  type="radio"
                  value="Male"
                  checked={values.Gender === "Male"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Male
              </label>
              <label for="" htmlFor="female">
                <input
                  id="female"
                  name="Gender"
                  type="radio"
                  value="Female"
                  checked={values.Gender === "Female"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Female
              </label>
              <label for="" htmlFor="other">
                <input
                  id="other"
                  name="Gender"
                  type="radio"
                  value="Other"
                  checked={values.Gender === "Other"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                Other
              </label>
            </div>
          </div>

          <div className="input-box">
            <input
              className="inp"
              type="text"
              name="phNo"
              value={values.phNo}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label for="">Phone No.</label>
            <i className='bx bxs-phone'></i>
          </div>
          <div className="input-box">
            <input
              className="inp"
              type="text"
              name="Hobby"
              value={values.Hobby}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label for="">Hobby</label>
            <i className='bx bxs-bookmarks'></i>
          </div>

          <button type="submit" className="btn mb-2" onClick={showToastMessage}>Sign-up</button>
          <a href="/login" style={{ color: "white" }}>Already Have an Account?</a>

        </form>
      </div>
    </div>
  )
}

export default Signup
