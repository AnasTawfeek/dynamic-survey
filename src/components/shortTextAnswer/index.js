import React from 'react'
import './style.css'

export default ({questionId, answerQuestion, userAnswer}) => (
    <div className="answers answers-short-text">
        <input
            type="text"
            placeholder="Please enter your answer..."
            value={userAnswer || ''}
            onChange={
                e => answerQuestion({id: questionId, answer: e.target.value})
            }
        />
    </div>
)
