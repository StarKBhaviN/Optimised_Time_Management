import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Components/Login';
import Home from './Components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
