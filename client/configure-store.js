import { createStore, applyMiddleware, compose } from "redux";


import createSagaMiddleware, { takeEvery } from "redux-saga";
import { fork, call, put } from "redux-saga/effects";
const reduxDevtools = window.devToolsExtension || (() => (noop) => noop);

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    reduxDevtools()
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const rootReducer = (state, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

function *rootSaga() {
  yield [
    fork(helloSagas),
  ];
}

function *helloSagas() {
  yield fork(takeEvery, "SAY_HELLO", sayHello);
}

function *sayHello(action) {
  console.log("Hello, world!");
}
