import { put, select } from "redux-saga/effects";

import {
  getPlayerPosition
} from "features/maps/reducer";

export const setInputModeSaga = function* ({mode}) {
  yield put({ type: "SET_SCREEN_MESSAGE", payload: {
    message: `Input mode set to ${mode}`
  }});
  yield put({ type: "SET_INPUT_MODE", payload: {
    mode
  }});
  if (mode === "normal") {
    const { x, y } = yield select(getPlayerPosition);
    yield put({ type: "CENTER_VIEWPORT", payload: {
      x, y
    }});
  }
};
