import React, { Component } from 'react'
import './App.css'
import TestContainer from './Test'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dynamic survey</h1>
        </header>
        <p className="App-intro">
          <TestContainer />
        </p>
      </div>
    );
  }
}

export default App;
