import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Intro from './Intro';
import About from './About';
import TaskRepresentations from './TaskRepresentations';
import TaskAddView from './TaskAddView';

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
      <Navbar a_token={token} auth_token_id={authToken} />
      <Intro a_token={token} auth_token_id={authToken} />
      <About a_token={token} auth_token_id={authToken} />
      <TaskAddView a_token={token} auth_token_id={authToken} />
    </>
  )
}

export default Home
