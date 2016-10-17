import { put, select } from "redux-saga/effects";

import {
  setScreenMessage,
  centerViewport
} from "features/rendering";

import {
  getPlayerPosition
} from "features/maps";

import {
  setInputMode
} from "features/input";

export default function* ({ mode }) {
  yield put(setScreenMessage(`Input mode set to ${mode}`));
  yield put(setInputMode(mode));
  if (mode === "normal") {
    const { x, y } = yield select(getPlayerPosition);
    yield put(centerViewport(x, y));
  }
}
