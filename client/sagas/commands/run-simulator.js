import { put } from "redux-saga/effects";
import { runClock } from "features/simulator";

export default function* () {
  yield put(runClock(10));
}
