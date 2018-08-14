import * as TYPES from '../constants/survey'
import {ACTIVE_SURVEY_API, SURVEY_API, ANSWERS_API} from '../constants'
import { push } from 'connected-react-router'
import sleep from '../utils/sleep'

// Get active survey id
const getActiveSurveyInProgress = () => ({
    type: TYPES.GET_ACTIVE_SURVEY_IN_PROGRESS
});

const getActiveSurveySuccess = id => ({
    type: TYPES.GET_ACTIVE_SURVEY_SUCCESS,
    id
});

const getActiveSurveyFailure = error => ({
    type: TYPES.GET_ACTIVE_SURVEY_FAILURE,
    error
});

// Get survey details
const getSurveyInProgress = () => ({
    type: TYPES.GET_SURVEY_IN_PROGRESS
});

const getSurveySuccess = survey => ({
    type: TYPES.GET_SURVEY_SUCCESS,
    survey
});

const getSurveyFailure = error => ({
    type: TYPES.GET_SURVEY_FAILURE,
    error
});

// Get active survey id then get survey details
export const getSurvey = async (dispatch) => {
        // Get active survey
        dispatch(getActiveSurveyInProgress());
        const activeSurveyRes = await fetch(ACTIVE_SURVEY_API);
        // await sleep(1000); // Mocking network delay
        if (activeSurveyRes.status !== 200) return dispatch(getActiveSurveyFailure(activeSurveyRes));
        const activeSurvey = await activeSurveyRes.json();
        dispatch(getActiveSurveySuccess(activeSurvey));

        // Get survey details
        dispatch(getSurveyInProgress());
        const surveyRes = await fetch(SURVEY_API(activeSurvey.id));
        // await sleep(1000); // Mocking network delay
        if (surveyRes.status !== 200) return dispatch(getSurveyFailure(surveyRes));
        const survey = await surveyRes.json();
        dispatch(getSurveySuccess(survey));
}

// Answer question
export const answerQuestion = ({id, answer}) => ({
    type: TYPES.ANSWER_QUESTION,
    data: {
        id,
        answer
    }
})

// Mark survey as done
export const markSurveyAsDone = _ => ({
    type: TYPES.MARK_SURVEY_AS_DONE
})

// Submit survey
const submitSurveyInProgress = () => ({
    type: TYPES.SUBMIT_SURVEY_IN_PROGRESS
});

const submitSurveySuccess = survey => ({
    type: TYPES.SUBMIT_SURVEY_SUCCESS,
    survey
});

const submitSurveyFailure = error => ({
    type: TYPES.SUBMIT_SURVEY_FAILURE,
    error
});

// Get active survey id then get survey details
export const submitSurvey = dispatch => async survey => {
        dispatch(submitSurveyInProgress());
        const surveyRes = await fetch(ANSWERS_API, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(survey)
        });
        // await sleep(1000); // Mocking network delay
        if (surveyRes.status !== 201) return dispatch(submitSurveyFailure(surveyRes));
        dispatch(submitSurveySuccess());
        dispatch(push('/success'));
}
