import * as actionTypes from '../actions/actionTypes'

const initialState = {
  error: null
}

const logInUser = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const logInReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_USER: return logInUser(currentState, action)
    default: return currentState
  }
}

export default logInReducer