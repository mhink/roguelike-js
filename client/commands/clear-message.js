import { put, select } from "redux-saga/effects";
import { getMessage } from "features/rendering/reducer";

export default function* () {
  if (yield select(getMessage)) {
    yield put({ type: "CLEAR_MESSAGE" });
  }
};
