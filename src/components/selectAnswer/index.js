import React from 'react'
import './style.css'

export default ({questionId, answers, answerQuestion, userAnswer}) => (
    <div className="answers answers-select">
        <select
            name={questionId}
            id={questionId}
            onChange={
                e => answerQuestion({id: questionId, answer: e.target.value})
            }
            value={userAnswer || 'default'}>
            <option key={0} className="option" value='default' disabled hidden>
                Please select...
            </option>
            {
                answers.map(answer => (
                    <option key={answer.id} className="option" value={answer.id}>
                        {answer.displayText}
                    </option>
                ))
            }
        </select>
    </div>
)
