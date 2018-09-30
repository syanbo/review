import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';
import './App.css';
import RichTextExample from './rich-text';

const Button = styled.button`
  color: red;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

class App extends Component {
  str = '2018-01-01 12:11';

  handleOpen = () => {
    console.log(this.str.substring(0, 11));
    // window.open("https://docschina.org/");
  };

  handleOpen1 = () => {
    setTimeout(() => {
      setTimeout(() => {
        window.open('https://docschina.org/');
      }, 0);
    }, 1000);
  };

  handleOpen2 = () => {
    this.timeout(() => {
      window.open('https://docschina.org/');
      // let newWindow = window.open();
      // newWindow.location = 'https://docschina.org/'
    });
  };

  handleOpen3 = () => {
    const newWindow = window.open();

    setTimeout(() => {
      newWindow.location = 'https://docschina.org/';
    }, 2000);
  };

  timeout = cb => {
    setTimeout(() => {
      cb && cb();
    }, 2000);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro" onClick={this.handleOpen}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div onClick={this.handleOpen}>Open</div>
        <div onClick={this.handleOpen1}>Open async</div>
        <div onClick={this.handleOpen2}>Open cb</div>
        <div onClick={this.handleOpen3}>Open 成功</div>
        <Button>styled-components</Button>
        <Rotate>&lt; &gt;</Rotate>
        <RichTextExample />
      </div>
    );
  }
}

export default App;
