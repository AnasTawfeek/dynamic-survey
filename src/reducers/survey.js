import * as TYPES from '../constants/survey'

const initialState = {
    activeSurveyId: null,
    loadingActiveSurvey: false,
    errorActiveSurvey: null,

    survey: null,
    loadingSurvey: false,
    errorSurvey: null,

    answers: {},
    currentStep: null,

    isDone: false,

    submittingSurvey: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        // Get active survey
        case TYPES.GET_ACTIVE_SURVEY_IN_PROGRESS:
            return {...state, loadingActiveSurvey: true}

        case TYPES.GET_ACTIVE_SURVEY_SUCCESS:
            return {
                ...state,
                loadingActiveSurvey: false,
                activeSurveyId: action.id
            }

        case TYPES.GET_ACTIVE_SURVEY_FAILURE:
            return {
                ...state,
                loadingActiveSurvey: false,
                errorActiveSurvey: action.error
            }

        // Get survey data
        case TYPES.GET_SURVEY_IN_PROGRESS:
            return {...state, loadingSurvey: true}

        case TYPES.GET_SURVEY_SUCCESS:
            return {
                ...state,
                loadingSurvey: false,
                survey: action.survey,
                currentStep: 0
            }

        case TYPES.GET_SURVEY_FAILURE:
            return {
                ...state,
                loadingSurvey: false,
                errorSurvey: action.error
            }

        // Answer question
        case TYPES.ANSWER_QUESTION:
            const {id, answer} = action.data;
            const answers = Object.assign({}, state.answers, {[id]: answer});
            return {
                ...state,
                answers
            }

        // Mark survey as done
        case TYPES.MARK_SURVEY_AS_DONE:
            return {...state, isDone: true}

        // Submit survey
        case TYPES.SUBMIT_SURVEY_IN_PROGRESS:
            return {...state, submittingSurvey: true}

        case TYPES.SUBMIT_SURVEY_SUCCESS:
        case TYPES.SUBMIT_SURVEY_FAILURE:
            return {...state, submittingSurvey: false}

        default:
            return state
    }
}
