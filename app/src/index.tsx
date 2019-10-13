import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import App from './app';
import 'bulma';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  if (!container) return;
  render(
    <Provider store={Store}>
      <App />
    </Provider>,
    container,
  );
});
