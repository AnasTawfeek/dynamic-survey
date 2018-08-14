import React, {Component} from 'react'
import {connect} from 'react-redux'
import { push } from 'connected-react-router'

import {ANSWER_TYPES} from '../constants'
import {answerQuestion} from '../actions/survey'

const answerTypes = Object.keys(ANSWER_TYPES).reduce((types, type) => {
    types[type] = require(`../components/${type}Answer`).default;
    return types;
}, {})

class Step extends Component{
    componentWillMount(){
        const {_survey: {questions}, _userAnswers, _goToStep} = this.props;
        const _currentQuestion = this._getCurrentQuestion();
        const _prevQuestionIndex = this._getPrevQuestion();

       /**
        * Go to first unanswered question if the current path id
        * doesn't exist or if there are unsolved question passed
        */
        const firstUnanswered = questions.find(question => !_userAnswers[question.id]);
        if (
            !_currentQuestion
            || (_prevQuestionIndex >= 0 && !_userAnswers[questions[_prevQuestionIndex].id])
        ) _goToStep(`/${firstUnanswered.id}`);
    }

    _getCurrentQuestion(){
        const {_currentPath, _survey: {questions}} = this.props;
        const _currentId = _currentPath.substring(1);
        const _currentQuestion = questions.find(question => question.id === _currentId);
        return _currentQuestion;
    }

    _getPrevQuestion(){
        const {_survey: {questions}} = this.props;
        const _currentQuestion = this._getCurrentQuestion();
        if(!_currentQuestion) return null;
        const prevQuestionIndex = questions.findIndex(question => question.id === _currentQuestion.id) - 1
        return prevQuestionIndex;
    }

    render() {
        const _currentQuestion = this._getCurrentQuestion();

        if (!_currentQuestion) return null;

        const {_answerQuestion, _userAnswers} = this.props;
        const {id, type, question, answers} = _currentQuestion;
        const _userAnswer = _userAnswers[id];
        const AnswerTypeComponent = answerTypes[type];

        return (
            <div className="step">
                <div className="step__question">{question}</div>
                <div className="step__answers">
                    <AnswerTypeComponent
                        questionId={id}
                        answers={answers}
                        answerQuestion={_answerQuestion}
                        userAnswer={_userAnswer}
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    _survey: state.survey.survey,
    _userAnswers: state.survey.answers,
    _currentPath: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
    _goToStep: page => dispatch(push(page)),
    _answerQuestion: ({id, answer}) => dispatch(answerQuestion({id, answer}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Step);
