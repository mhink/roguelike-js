import { call } from "redux-saga/effects";

export default function* (...args) {
  // eslint-disable-next-line no-console
  yield call([console, console.log], args);
};
