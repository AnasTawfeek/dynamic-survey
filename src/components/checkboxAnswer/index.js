import React from 'react'
import './style.css'

export default ({questionId, answers, answerQuestion, userAnswer = []}) => (
    <div className="answers answers-choice">
        {
            answers.map(answer => (
                <div key={answer.id} className="answer">
                    <input
                        type="checkbox"
                        id={answer.id}
                        name={questionId}
                        checked={userAnswer.indexOf(answer.id) !== -1}
                        // onChange={() => answerQuestion({id: questionId, answer: answer.id})}
                        onChange={e => {
                            e.target.checked
                            ? answerQuestion({id: questionId, answer: [...userAnswer, answer.id]})
                            : answerQuestion({id: questionId, answer: [...(userAnswer.splice(userAnswer.indexOf(answer.id), 1) && userAnswer)]})
                        }}/>
                    <label htmlFor={answer.id}>{answer.displayText}</label>
                </div>
            ))
        }
    </div>
)
