import React from 'react'
import Navbar from './Navbar'
import Intro from './Intro'
import About from './About'
import TaskRepresentations from './TaskRepresentations'
import TaskAddView from './TaskAddView'

function Home() {
  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <TaskAddView />
      <TaskRepresentations />
    </>
  )
}

export default Home
