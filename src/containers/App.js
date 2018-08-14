import React  from 'react'
import './App.css'
import SurveyContainer from './Survey'

export default () => (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Dynamic survey</h1>
        </header>
        <div className="App-body">
            <SurveyContainer />
        </div>
    </div>
);
