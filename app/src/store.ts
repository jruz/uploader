import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducer';
import { ActionT } from './actions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewares = [thunk, promise];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middlewares);

export interface StoreT {
  getState: () => StateT;
  dispatch: (action: ActionT) => void;
}

export default createStore(reducer, composeEnhancers(middleware));
