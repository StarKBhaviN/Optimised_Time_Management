import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <div className="App">
      <div>
        <h1>Backend Data:</h1>
        {data ? <p>{data}</p> : <p>Loading...</p>}
        sksfnksan
      </div>
    </div>
  );
}

export default App;
