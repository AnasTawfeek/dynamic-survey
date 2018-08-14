import React from 'react'
import './style.css'

export default ({questionId, answers, answerQuestion, userAnswer}) => (
    <div className="answers answers-choice">
        {
            answers.map(answer => (
                <div key={answer.id} className="answer">
                    <input
                        type="radio"
                        id={answer.id}
                        name={questionId}
                        checked={userAnswer === answer.id}
                        onChange={() => answerQuestion({id: questionId, answer: answer.id})}/>
                    <label htmlFor={answer.id}>{answer.displayText}</label>
                </div>
            ))
        }
    </div>
)
