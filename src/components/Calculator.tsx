import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const CalculatorContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 15px;
  background: #2c3e50;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
`;

const Display = styled.div`
  background: #1abc9c;
  color: #fff;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  text-align: right;
  font-family: 'digital-clock-font', monospace;
  font-size: 2.5rem;
  min-height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 10px;
  min-height: 300px;
`;

interface ButtonProps {
  isOperator?: boolean;
  isEquals?: boolean;
  isDouble?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 1.2rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => 
    props.isEquals ? '#e74c3c' : 
    props.isOperator ? '#3498db' : 
    '#34495e'
  };
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  grid-column: ${props => props.isDouble ? 'span 2' : 'span 1'};
  ${props => props.isEquals && `
    grid-row: 4 / span 2;
    grid-column: 4;
  `}

  &:hover {
    transform: translateY(-2px);
    filter: brightness(110%);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 1.2rem;
  }
`;

// Custom hook for calculator logic
const useCalculator = () => {
  const [display, setDisplay] = useState<string>('0');
  const [lastResult, setLastResult] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  const [isDecimal, setIsDecimal] = useState<boolean>(false);

  // Example of useEffect - updating document title
  useEffect(() => {
    document.title = `Calc: ${display}`;
    // Optional cleanup function
    return () => {
      document.title = 'React Calculator';
    };
  }, [display]); // Only re-run if display changes

  // Example of useEffect - logging calculations
  useEffect(() => {
    if (lastResult) {
      console.log('Last calculation:', lastResult);
    }
  }, [lastResult]);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    const lastChar = display.slice(-1);
    setIsNewNumber(false);
    
    if (['+', '-', '*', '/'].includes(lastChar)) {
      if (op === '-' && lastChar !== '-') {
        setDisplay(display + op);
      } else {
        setDisplay(display.slice(0, -1) + op);
      }
    } else {
      setDisplay(display + op);
    }
    setIsDecimal(false);
  };

  const handleDecimal = () => {
    if (isNewNumber) {
      setDisplay('0.');
      setIsNewNumber(false);
      setIsDecimal(true);
      return;
    }
    
    if (!isDecimal) {
      const lastNumber = display.split(/[-+*/]/).pop() || '';
      if (!lastNumber.includes('.')) {
        setDisplay(display + '.');
        setIsDecimal(true);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setLastResult('');
    setIsNewNumber(true);
    setIsDecimal(false);
  };

  const handleEquals = () => {
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + display)();
      setLastResult(String(result));
      setDisplay(String(result));
      setIsNewNumber(true);
      setIsDecimal(String(result).includes('.'));
    } catch (error) {
      setDisplay('Error');
      setIsNewNumber(true);
    }
  };

  return {
    display,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleClear,
    handleEquals
  };
};

const Calculator: React.FC = () => {
  const {
    display,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleClear,
    handleEquals
  } = useCalculator();

  return (
    <CalculatorContainer>
      <Display>{display}</Display>
      <ButtonGrid>
        <Button isDouble onClick={handleClear}>AC</Button>
        <Button isOperator onClick={() => handleOperator('/')}>/</Button>
        <Button isOperator onClick={() => handleOperator('*')}>×</Button>
        
        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button isOperator onClick={() => handleOperator('-')}>-</Button>
        
        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button isOperator onClick={() => handleOperator('+')}>+</Button>
        
        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button isEquals onClick={handleEquals}>=</Button>
        
        <Button isDouble onClick={() => handleNumber('0')}>0</Button>
        <Button onClick={handleDecimal}>.</Button>
      </ButtonGrid>
    </CalculatorContainer>
  );
};

export default Calculator; 