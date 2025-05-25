import React from 'react';
import Calculator from './components/Calculator';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto Mono', monospace;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Calculator />
    </>
  );
};

export default App;
