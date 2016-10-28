import { map, filter, shuffle } from "lodash";
import { select, put } from "redux-saga/effects";
import { 
  entityCanMoveTo,
  getPositionForEntity,
  getOtherEntitiesOnMap,
  getMapDimensions,
  getEntityAtPosition
} from "features/maps";

import {
  getAppearanceForEntity
} from "features/appearance";

import {
  getCombatDetailsForEntity,
  getDeadEntityUuids
} from "features/combat";

import {
  setScreenMessage
} from "features/rendering";

import {
  getItemDetailsForEntity
} from "features/items";

import {
  ALL_DIRECTIONS
} from "util/directions";

import {
  getVectorAtPoint
} from "features/vecfield";

const getNeighborForVector = (theta) => {
  const xh = Math.cos(theta);
  const yh = Math.sin(theta);
  return [Math.sign(xh), Math.sign(yh)];
}

export default function* (uuid) {
  const { x, y, mapUuid } = yield select(getPositionForEntity, uuid);
  const { theta, r } = yield select(getVectorAtPoint, x, y);

  let dx, dy;
  if (r > 0.01) {
    const n_vec = getNeighborForVector(theta);
    dx = n_vec[0];
    dy = n_vec[1];
  } else {
    const rand_vec = shuffle(ALL_DIRECTIONS)[0];
    dx = rand_vec.dx
    dy = rand_vec.dy
  }

  console.log(dx, dy);

  const uuidAtPosition = yield select(getEntityAtPosition, x+dx, y+dy, mapUuid);
  if (uuidAtPosition) {
    const canFight = yield select(getCombatDetailsForEntity, uuidAtPosition);
    const isItem = yield select(getItemDetailsForEntity, uuidAtPosition);
    if (canFight) {
      yield put({
        type: "DO_COMBAT",
        payload: {
          attackerUuid: uuid,
          targetUuid: uuidAtPosition,
        }
      });
      const toReap = yield select(getDeadEntityUuids);
      for (const uuid of toReap) {
        yield put({
          type: "REAP_ENTITY",
          payload: { uuid }
        });
      }
      return;
    }

    if (isItem) {
      yield put({
        type: "REAP_ENTITY",
        payload: {uuid: uuidAtPosition}
      });
    }
  }

  const canMove = yield select(entityCanMoveTo, uuid, { dx, dy });
  if (canMove) {
    yield put({
      type: "MOVE_ENTITY",
      payload: {
        uuid,
        dx, dy,
      }
    });
  }

  return;
};
