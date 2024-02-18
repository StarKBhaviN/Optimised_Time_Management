import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Components/Login';

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
