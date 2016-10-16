import { put, select } from "redux-saga/effects";

import {
  setScreenMessage,
  centerViewport
} from "features/rendering/reducer";

import {
  getPlayerPosition
} from "features/maps/reducer";

import {
  setInputMode
} from "features/input/reducer";

export default function* ({ mode }) {
  yield put(setScreenMessage(`Input mode set to ${mode}`));
  yield put(setInputMode(mode));
  if (mode === "normal") {
    const { x, y } = yield select(getPlayerPosition);
    yield put(centerViewport(x, y));
  }
};
