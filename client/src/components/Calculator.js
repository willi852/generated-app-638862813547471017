import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearInput();
    } else if (value === '⌫') {
      setInput(prev => prev.slice(0, -1));
    } else {
      setInput(prev => prev + value);
    }
  };

  const calculateResult = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/calculator/calculate', {
        expression: input
      });
      setResult(response.data.result.toString());
    } catch (error) {
      setResult('Error');
      console.error('Calculation error:', error.message);
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const buttons = [
    '7', '8', '9', '/', '⌫',
    '4', '5', '6', '*', '(',
    '1', '2', '3', '-', ')',
    '0', '.', '=', '+', 'C',
    'sin', 'cos', 'tan', 'log', '√'
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={handleButtonClick}
            className={btn === '=' ? 'equals' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;