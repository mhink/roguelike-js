import { put, select } from "redux-saga/effects";

import {
  getPlayerUuid
} from "features/player/reducer";

export default function* ({ dx, dy }) {
  const uuid = yield select(getPlayerUuid);
  yield put({
    type:    "MOVE_ENTITY",
    payload: {
      uuid, dx, dy
    }
  });
  yield put({
    type:    "ADJUST_VIEWPORT",
    payload: {
      dx, dy
    }
  });
};
