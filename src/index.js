import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap';
import App from './mine/app';
import AppProviders from './mine/context';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)
