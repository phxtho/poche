import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from "./components/canvas/canvas";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          reless
        </p>
      </header>
      <Canvas/>
    </div>
  );
}

export default App;
