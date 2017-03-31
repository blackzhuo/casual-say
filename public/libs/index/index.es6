import '../../scss/index/index.scss';

import React, { PropTypes } from 'react';
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './container/App.es6'
import reducer from './reducers/index.es6'

const totalReducer = combineReducers({
  reducer
});

const store = createStore(totalReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)