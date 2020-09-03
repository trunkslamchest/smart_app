import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import ScrollRestore from './utility/scrollRestore'

import devTestReducer from './store/reducers/devTestReducer'
import storeReducer from './store/reducers/storeReducer'
import modalReducer from './store/reducers/modalReducer'
import authReducer from './store/reducers/authReducer'
import logInReducer from './store/reducers/logInReducer'
import signUpReducer from './store/reducers/signUpReducer'
import userReducer from './store/reducers/userReducer'
import questionsReducer from './store/reducers/questionsReducer'

const history = createBrowserHistory();

const rootReducer = combineReducers({
  devTest: devTestReducer,
  store: storeReducer,
  modal: modalReducer,
  auth: authReducer,
  logIn: logInReducer,
  signUp: signUpReducer,
  user: userReducer,
  questions: questionsReducer,
})

// const logger = (store) => {
//   return next => {
//     return action => {
//       console.log('[Middleware] action', action)
//       const nextResult = next(action)
//       console.log('[Middleware] next state', store.getState())
//       return nextResult
//     }
//   }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const RouterApp = (
  <Provider store={store}>
    <Router history={history}>
      <ScrollRestore />
      <App history={history}/>
    </Router>
  </Provider>
)

ReactDOM.render(RouterApp, document.getElementById('root'));

serviceWorker.register();
