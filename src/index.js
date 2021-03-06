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

import modalReducer from './store/reducers/modalReducer'
import authReducer from './store/reducers/authReducer'
import userReducer from './store/reducers/userReducer'
import questionsReducer from './store/reducers/questionsReducer'
import playReducer from './store/reducers/playReducer'
import achievementReducer from './store/reducers/achievementReducer'
import profileReducer from './store/reducers/profileReducer'
import leaderBoardsReducer from './store/reducers/leaderBoardsReducer'

const history = createBrowserHistory();

const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  user: userReducer,
  questions: questionsReducer,
  play: playReducer,
  achievements: achievementReducer,
  profile: profileReducer,
  leaderBoards: leaderBoardsReducer
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

const RouterApp = (
  <Provider store={ store }>
    <Router history={ history }>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(RouterApp, document.getElementById('root'));

serviceWorker.register();