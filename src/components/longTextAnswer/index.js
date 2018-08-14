import React from 'react'
import './style.css'

export default ({questionId, answerQuestion, userAnswer}) => (
    <div className="answers answers-long-text">
        <textarea
            value={userAnswer || ''}
            placeholder="Please enter your answer..."
            onChange={
                e => answerQuestion({id: questionId, answer: e.target.value})
            } />
    </div>
)
