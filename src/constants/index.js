// Root api endpoint
export const ROOT_API = 'http://localhost:3001';

// Current active survey endpoint
export const ACTIVE_SURVEY_API = `${ROOT_API}/active-survey`;

// All surveys endpoint
export const SURVEYS_API = `${ROOT_API}/surveys`;

// Single survey endpoint
export const SURVEY_API = id => `${SURVEYS_API}/${id}`;

// Answers endpoint
export const ANSWERS_API = `${ROOT_API}/answers`;

// Answer types
// [type]: [is predefined answers]
export const ANSWER_TYPES = {
    'choice': {
        predefined: true,
        multi: false,
    },
    'select': {
        predefined: true,
        multi: false,
    },
    'shortText': {
        predefined: false,
        multi: false,
    },
    'longText': {
        predefined: false,
        multi: false,
    },
    'checkbox': {
        predefined: true,
        multi: true,
    },
}
