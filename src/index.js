import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, /*applyMiddleware,*/ compose } from 'redux';
import { Provider } from 'react-redux';
//import { logger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist'

import gameReducer from './reducers/gameReducer';

const reducer = combineReducers({
  game: gameReducer
});

const store = createStore(
  reducer,
  compose(
//    applyMiddleware(logger),
    autoRehydrate()
  )
);

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
