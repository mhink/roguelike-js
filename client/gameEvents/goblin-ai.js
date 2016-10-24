import { map, filter, shuffle } from "lodash";
import { select, put } from "redux-saga/effects";
import { 
  entityCanMoveTo,
  getPositionForEntity,
  getOtherEntitiesOnMap,
  getMapDimensions,
} from "features/maps";

import {
  getAppearanceForEntity
} from "features/appearance";

import buildDijkstraMap from "util/dijkstra-map";

const DIRECTIONS = [
  { dx: -1, dy: +0 },
  { dx: +0, dy: +1 },
  { dx: +0, dy: -1 },
  { dx: +1, dy: +0 },
  { dx: -1, dy: -1 },
  { dx: +1, dy: -1 },
  { dx: -1, dy: +1 },
  { dx: +1, dy: +1 },
];

export default function* (uuid) {
  yield put({
    type: "SHOW_BRAIN",
    payload: { uuid }
  });

  console.log(`Calculating AI for goblin ${uuid}`);
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


  return;
};
