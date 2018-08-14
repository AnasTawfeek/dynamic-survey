import React from 'react'

export default ({questionId, answerQuestion, userAnswer}) => (
    <div className="answers answers-short-text">
        <input
            type="text"
            value={userAnswer || ''}
            onChange={
                e => answerQuestion({id: questionId, answer: e.target.value})
            }
        />
    </div>
)
