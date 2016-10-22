import { put, select } from "redux-saga/effects";

import {
  entityCanMoveTo,
  getEntityAtPosition,
  getCurrentMap,
  getPositionForEntity
} from "features/maps";

import {
  getPlayerUuid
} from "features/player";

import {
  getDeadEntityUuids
} from "features/combat";

export default function* ({ dx, dy }) {
  const uuid = yield select(getPlayerUuid);
  const { x: x0, y: y0 } = yield select(getPositionForEntity, uuid);
  const canMove = yield select(entityCanMoveTo, uuid, { dx, dy });
  const mapUuid = yield select(getCurrentMap);
  const uuidAtPosition = yield select(getEntityAtPosition, x0 + dx, y0 + dy, mapUuid);

  if (uuidAtPosition) {
    yield put({
      type: "DO_COMBAT",
      payload: {
        attackerUuid: uuid,
        targetUuid: uuidAtPosition
      }
    });
    const toReap = yield select(getDeadEntityUuids);
    for(const uuid of toReap) {
      yield put({
        type: "REAP_ENTITY",
        payload: { uuid }
      });
    }
    return true;
  }

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
    return true;
  }
}
