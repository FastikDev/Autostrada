import React, { useState } from 'react';
import './index.css'

const Main = () => {
  const [value, setValue] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState(0);
  const [showList, setShowList] = useState(false); // для показа списка

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const addNumber = () => {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      setNumbers([...numbers, parsed]);
    }
    setValue('');
  };

  const handleClick = () => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    setResult(sum);
  };

  const onShow = () => {
    setShowList(!showList); // переключение состояния
  };

  return (
    <div className="main">
      <div className="input-row">
        <input className="input" type="text" value={value} onChange={handleChange} />
        <button className="btn add" onClick={addNumber}>Add</button>
      </div>

      <div className="result-display">{result}</div>
      <button className="btn show" onClick={onShow}>
        {showList ? 'Hide' : 'Show'}
      </button>

      {showList && (
        <ol className="number-list">
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ol>
      )}

      <button className="btn result" onClick={handleClick}>Result</button>
    </div>
  );
};

export default Main;