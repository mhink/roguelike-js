import { select, put, call, take } from "redux-saga/effects";

import { 
  getPositions
} from "features/maps/reducer";

import {
  shouldRender,
  getTileParams,
  getTileForEntity,
} from "features/tilesets/reducer";

const renderCanvas = function* (context2d, value) {
  const sx = context2d.canvas.clientWidth;
  const sy = context2d.canvas.clientHeight;
  context2d.fillRect(0,0,sx,sy);

  if(yield select(shouldRender)) {
    const positions = yield select(getPositions);
    for(let [uuid, { x, y }] of positions) {
      const tileName = yield select(getTileForEntity, uuid);
      const coords = yield select(getTileParams, x, y, tileName);
      context2d.drawImage(...coords);
    }
  }
};

export const renderingSystem = function* (context2d, sourceChannel) {
  while (true) {
    const value = yield take(sourceChannel);
    yield call(renderCanvas, context2d, value);
  }
}
