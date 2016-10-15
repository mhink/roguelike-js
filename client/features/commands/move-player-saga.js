import { put, select } from "redux-saga/effects";

import {
  getOffset,
} from "features/rendering/reducer";

import {
  getPlayerUuid
} from "features/player/reducer";

export const movePlayerSaga = function* ({dx, dy}) {
  const { x: x0, y: y0 } = yield select(getOffset);
  const uuid = yield select(getPlayerUuid);
  yield put({ type: "MOVE_ENTITY", payload: {
    uuid, dx, dy
  }});
  yield put({ type: "ADJUST_VIEWPORT", payload: {
    dx, dy
  }})
};
