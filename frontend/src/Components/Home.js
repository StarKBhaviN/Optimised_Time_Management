import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Intro from './Intro';
import About from './About';
import TaskAddView from './TaskAddView';
import DayScheduler from './DayScheduler'
import { motion } from "framer-motion"

function Home() {

  const [token, setToken] = useState()
  const [authToken, setAuthToken] = useState()
  useEffect(() => {
    const token = localStorage.getItem('OTM_Token');

    if (token) {
      setToken(true);
      setAuthToken(token)
    } else {
      setToken(false);
      setAuthToken(null)
    }
  }, []);

  return (
    <>
      {/* Calling all the componenets in Home */}
      <Navbar a_token={token} auth_token_id={authToken} motion={motion} />
      <Intro a_token={token} auth_token_id={authToken} motion={motion} />
      <About a_token={token} auth_token_id={authToken} motion={motion} />
      <TaskAddView a_token={token} auth_token_id={authToken} motion={motion} />
      <DayScheduler ></DayScheduler>
    </>
  )
}

export default Home
