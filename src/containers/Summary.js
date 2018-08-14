import React, {Component} from 'react'
import {connect} from 'react-redux'
import { push } from 'connected-react-router'
import {ANSWER_TYPES} from '../constants'
import {submitSurvey} from '../actions/survey'

class Summary extends Component {
    componentWillMount(){
        // If survey not done, redirect the user to the first unsolved question
        const {_survey, _answers, _goToStep, _isDone} = this.props;
        if(!_isDone) {
            let firstUnanswered = _survey.questions.find(question => !_answers[question.id]).id;
            _goToStep(`/${firstUnanswered}`);
        }
    }
    render() {
        const {_survey, _answers, _isDone, _goToStep, _submitSurvey} = this.props;
        if (!_isDone) return null;
        return (
            <div className="summary">
                <h2>Summary</h2>
                {
                    _survey.questions.map(({question, id, type, answers}) => (
                        <div className="summary__item" key={id}>
                            <div className="summary__item__question">
                                {question}
                            </div>
                            <div className="summary__item__answer">
                                {
                                    ANSWER_TYPES[type].predefined
                                    ? (
                                        ANSWER_TYPES[type].multi
                                        ? _answers[id].map(id => (
                                            answers.find(answer => id === answer.id).displayText
                                        )).join(', ')
                                        : answers.find(answer => answer.id === _answers[id]).displayText
                                    )
                                    : _answers[id]
                                }
                            </div>
                            <button
                                className="summary__item__edit"
                                onClick={_ => _goToStep(id)}>Quick edit</button>
                        </div>
                    ))
                }
                <button
                    className="summary__submit"
                    onClick={() => _submitSurvey(_answers)}>Done</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    _survey: state.survey.survey,
    _answers: state.survey.answers,
    _isDone: state.survey.isDone
});

const mapDispatchToProps = dispatch => ({
    _goToStep: step => dispatch(push(step)),
    _submitSurvey: survey => submitSurvey(dispatch)(survey)
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
