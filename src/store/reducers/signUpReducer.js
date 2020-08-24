import * as actionTypes from '../actions/actionTypes'

const initialState = {
  error: null
}

const signUpUser = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const signUpReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.SIGNUP_USER: return signUpUser(currentState, action)
    default: return currentState
  }
}

export default signUpReducer