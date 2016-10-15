import { put } from "redux-saga/effects";

export const moveCameraSaga = function* ({ dx, dy }) {
  yield put({ type:    "ADJUST_VIEWPORT", payload: {
    dx, dy
  } });
};
