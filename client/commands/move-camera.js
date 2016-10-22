import { put } from "redux-saga/effects";

export default function* ({ dx, dy }) {
  yield put({
    type:    "ADJUST_VIEWPORT", 
    payload: {
      dx, dy
    }
  });
  return false;
}
