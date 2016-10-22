import { put, select } from "redux-saga/effects";

import {
  entityCanMoveTo
} from "features/maps";

import {
  getPlayerUuid
} from "features/player";

export default function* ({ dx, dy }) {
  const uuid = yield select(getPlayerUuid);
  const canMove = yield select(entityCanMoveTo, uuid, { dx, dy });
  if (canMove) {
    yield put({
      type:    "MOVE_ENTITY",
      payload: {
        uuid,
        dx,
        dy,
        cameraTracking: true
      }
    });
  }
}
