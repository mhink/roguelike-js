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
  getDeadEntityUuids
} from "features/combat";

import buildDijkstraMap, {
  findDownhill
} from "util/dijkstra-map";

export default function* (uuid) {
  yield put({
    type: "SHOW_BRAIN",
    payload: { uuid }
  });

  const { x, y, mapUuid } = yield select(getPositionForEntity, uuid);

  const mapDimensions = yield select(getMapDimensions, mapUuid);
  const entitiesOnMap = yield select(getOtherEntitiesOnMap, uuid, mapUuid);
  const appearances = [];
  for(const uuid of entitiesOnMap) {
    const appearance = yield select(getAppearanceForEntity, uuid);
    const position = yield select(getPositionForEntity, uuid);
    appearances.push([uuid, appearance, position]);
  }

  const attractors = filter(appearances, ([uuid, appearance]) => {
    if (appearance.food) {
      return true;
    }
    if (appearance.body === 'humanoid' && appearance.species !== 'goblin') {
      return true;
    }
    return false;
  });

  const attPos = map(attractors, ([uuid, appearance, position]) => position);
  const dmap = buildDijkstraMap(mapDimensions, attPos);
  yield put({
    type: "SET_ATTRACTOR_MAP",
    payload: {
      uuid,
      dmap
    }
  });

  const moveDir = findDownhill(dmap, x, y, mapDimensions.x, mapDimensions.y);
  const { dx, dy } = moveDir;
  const uuidAtPosition = yield select(getEntityAtPosition, x+dx, y+dy, mapUuid);
  if (uuidAtPosition) {
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

  const canMove = yield select(entityCanMoveTo, uuid, moveDir);
  if (canMove) {
    yield put({
      type: "MOVE_ENTITY",
      payload: {
        uuid,
        ...moveDir,
      }
    });
  }

  return;
};
