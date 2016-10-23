import { map, filter, shuffle } from "lodash";
import { select, put } from "redux-saga/effects";
import { 
  entityCanMoveTo,
  getPositionForEntity,
  getOtherEntitiesOnMap
} from "features/maps";

import {
  getAppearanceForEntity
} from "features/appearance";

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
  console.log(`Calculating AI for goblin ${uuid}`);
  const { x, y, mapUuid } = yield select(getPositionForEntity, uuid);
  const entitiesOnMap = yield select(getOtherEntitiesOnMap, uuid, mapUuid);

  const appearances = [];
  for(const uuid of entitiesOnMap) {
    const appearance = yield select(getAppearanceForEntity, uuid);
    appearances.push([uuid, appearance]);
  }

  const attractors = filter(appearances, ([uuid, appearance]) => {
    if(appearance.body === 'humanoid' && appearance.species !== 'goblin') {
      return true;
    }
    return false;
  });

  console.log(attractors);

  return;
};
