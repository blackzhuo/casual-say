import '../../scss/index/index.scss';

import React, { PropTypes } from 'react';
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './container/App.es6'
import chatMessageReducer from './reducers/index.es6'

const totalReducer = combineReducers({
  chatMessageReducer
});

const store = createStore(totalReducer);

require('../game/index.es6');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)