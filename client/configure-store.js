import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import sagaMonitor from './util/saga-monitor';

const reduxDevtools = window.devToolsExtension || (() => (noop) => noop);

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor
  });

  const middlewares = [
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    reduxDevtools(),
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  return [store, sagaMiddleware];
};
