import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [inputText, setInputText] = useState('');
  const [queryResult, setQueryResult] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('api/query', { prompt: inputText });
      setQueryResult(response.data);
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>SQL Gpt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a prompt to query your PG database:
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="query-input" // Add a custom class for the input field
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="query-result">
        <h2>Query Result</h2>
        {queryResult.map((item, index) => {
          return (
            <div key={item.id} className="query-result-item">
              <span>{item.name}</span>
              <span>{item.genre}</span>
              <span>{item.available_start_time}</span>
              <span>{item.end_time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
