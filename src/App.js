import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const filterOptions = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const parsedInput = JSON.parse(jsonInput);
      const { data } = await axios.post('https://ra2111003030119-pratham.onrender.com/bfhl', parsedInput);
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or server error.');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected ? selected.map(option => option.value) : []);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers = [], alphabets = [], highest_alphabet = [] } = response;

    return (
      <div className="results-container">
        {selectedOptions.includes('numbers') && numbers.length > 0 && (
          <div className="result-card">
            <strong>Numbers:</strong> {numbers.join(', ')}
          </div>
        )}
        {selectedOptions.includes('alphabets') && alphabets.length > 0 && (
          <div className="result-card">
            <strong>Alphabets:</strong> {alphabets.join(', ')}
          </div>
        )}
        {selectedOptions.includes('highest_alphabet') && highest_alphabet.length > 0 && (
          <div className="result-card">
            <strong>Highest Alphabet:</strong> {highest_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Frontend Application</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON here...'
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={filterOptions}
            onChange={handleSelectChange}
            className="multi-select"
            classNamePrefix="select"
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
