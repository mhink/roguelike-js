import { put, select } from "redux-saga/effects";

import {
  setScreenMessage,
  getCameraFrozen,
  setCameraFrozen,
  centerViewport
} from "features/rendering";

import {
  getPlayerPosition
} from "features/maps";

export default function* () {
  const isCameraFrozen = yield select(getCameraFrozen);

  yield put(setCameraFrozen(!isCameraFrozen));

  if(!isCameraFrozen) {
    yield put(setScreenMessage("Froze camera position"));
  } else {
    const { x, y } = yield select(getPlayerPosition);
    yield put(centerViewport(x, y));
    yield put(setScreenMessage("Unfroze camera position."));
  }
};
