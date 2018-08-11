import {ADD} from '../actions/test'

const initialState = {
    text: 'bar'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        text: 'foo'
    }

    default:
      return state
  }
}
