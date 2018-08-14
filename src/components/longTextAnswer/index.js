import React from 'react'

export default ({questionId, answerQuestion, userAnswer}) => (
    <div className="answers answers-long-text">
        <textarea
            value=
            {userAnswer || ''}
            onChange={
                e => answerQuestion({id: questionId, answer: e.target.value})
            } />
    </div>
)
