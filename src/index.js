/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadName} from './actions/nameAction';
import Home from './components/home';
const store = configureStore();
//store.dispatch(loadName());
render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app')
);
