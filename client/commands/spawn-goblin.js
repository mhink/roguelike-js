import { select, put } from "redux-saga/effects";

import {
  getCurrentMapDimensions
} from "features/maps";

import { spawnGoblin } from "entities";

export default function* () {
  const { x: sx, y: sy } = yield select(getCurrentMapDimensions);
  const rx = Math.floor(Math.random() * sx);
  const ry = Math.floor(Math.random() * sy);

  yield put(spawnGoblin(rx, ry));
}
