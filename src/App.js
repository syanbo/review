import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  onPress = e => {
    const a = 1;
    return a + 10;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.onPress} />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
