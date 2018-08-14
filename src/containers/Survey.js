import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import Step from './Step'
import Summary from './Summary'
import Success from '../components/Success'

import { getSurvey, markSurveyAsDone } from '../actions/survey'

import './Survey.css'

class Survey extends Component {
    componentWillMount(){
        const {_getSurvey} = this.props;
        _getSurvey();
    }

    _renderLoading(){
        return (
            <div className="survey__loading">
                <i className="fas fa-circle-notch fa-spin"></i>
            </div>
        )
    }

    _renderError(){
        return (
            <div class="survey__error">
                <i class="fas fa-exclamation-triangle"></i> We are terribly sorry, something wrong happened.
            </div>
        )
    }

    _renderProgress(){
        const { _survey: {questions}, _answers } = this.props;
        const answeredQuestions = questions.filter(question => !!_answers[question.id]);
        const percent = answeredQuestions.length / questions.length * 100;
        return (
            <div className="survey__progress" data-done={percent === 100}>
                {answeredQuestions.length} of {questions.length} answered
                <div
                    className="survey__progress__bar"
                    style={{
                        width: `${percent}%`,
                        background: percent === 100 ? '#20bf6b' : '#0fb9b1'
                    }}>
                    {
                        percent === 100
                        ? <i class="fas fa-check-circle"></i>
                        : <span>{percent}%</span>
                    }
                </div>
            </div>
        )
    }

    _renderStep(){
        return (
            <div className="survey__step-container">
                <Switch>
                    <Route exact path="/summary" component={Summary} />
                    <Route exact path="/success" component={Success} />
                    <Route exact path="/:id?" component={Step} />
                </Switch>
            </div>
        )
    }

    _renderNavigation(){
        const {
            _survey: {questions}, _currentPath, _answers,
            _markSurveyAsDone, _goToStep, _goToSummary,
            _isDone
        } = this.props;
        const _currentId = _currentPath.substring(1);
        const _currentQuestion = questions.find(question => question.id === _currentId);
        const _currentQuestionIndex = questions.findIndex(question => question.id === _currentId);
        if (!_currentQuestion) return null;
        return (
            <div className="survey__nav">
                {
                    _isDone
                    ? null
                    : (
                        <button
                            className="survey__nav__btn survey__nav__prev"
                            onClick={_ => _goToStep(questions[_currentQuestionIndex - 1].id)}
                            disabled={_currentQuestionIndex === 0}>
                            Prev
                        </button>
                    )
                }
                <button
                    className="survey__nav__btn survey__nav__next"
                    onClick={_ => {
                        _currentQuestionIndex === questions.length - 1
                        || _isDone
                        ? (_markSurveyAsDone(), _goToSummary())
                        : _goToStep(questions[_currentQuestionIndex + 1].id)
                    }}
                    disabled={!_answers[_currentQuestion.id]}>
                    {
                        _currentQuestionIndex === questions.length - 1
                        || _isDone
                        ? <span>{_isDone ? 'Jump to summary' : 'Summary'}</span>
                        : <span>Next</span>
                    }
                </button>
            </div>
        )
    }

    render() {
        const {
            _loadingActiveSurvey,
            _errorActiveSurvey,
            _survey,
            _loadingSurvey,
            _errorSurvey
        } = this.props;

        if(_loadingActiveSurvey || _loadingSurvey || !_survey){
            return this._renderLoading();
        }else if(_errorActiveSurvey || _errorSurvey){
            return this._renderError();
        } else {
            return (
                <div className="survey">
                    {this._renderProgress()}
                    {this._renderStep()}
                    {this._renderNavigation()}
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    _loadingActiveSurvey: state.survey.loadingActiveSurvey,
    _errorActiveSurvey: state.survey.errorActiveSurvey,

    _survey: state.survey.survey,
    _loadingSurvey: state.survey.loadingSurvey,
    _errorSurvey: state.survey.errorSurvey,

    _currentStep: state.survey.currentStep,
    _answers: state.survey.answers,
    _currentPath: state.router.location.pathname,

    _isDone: state.survey.isDone
});

const mapDispatchToProps = dispatch => ({
    _getSurvey: _ => getSurvey(dispatch),
    _markSurveyAsDone: _ => dispatch(markSurveyAsDone()),
    _goToStep: step => dispatch(push(step)),
    _goToSummary: _ => dispatch(push('/summary'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
