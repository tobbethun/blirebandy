import React, { Component } from 'react';
import logo from './logo.svg';
import boll from './bandyboll.png';
import './App.css';
import Register from './Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={boll} className="App-logo" alt="logo" />
            <Register />
        </header>
      </div>
    );
  }
}

export default App;
