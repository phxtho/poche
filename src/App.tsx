import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'remirror/styles/all.css';
import EditorWrapper from "./components/editor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Re-Mirror
        </p>
      </header>
      <EditorWrapper/>
    </div>
  );
}

export default App;
