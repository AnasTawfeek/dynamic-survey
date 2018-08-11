import React  from 'react'
import './App.css'
import TestContainer from './Test'

export default () => (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Dynamic survey</h1>
        </header>
        <p className="App-intro">
            <TestContainer />
        </p>
    </div>
);
