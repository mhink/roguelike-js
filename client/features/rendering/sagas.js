import { takeEvery } from "redux-saga";
import { select, put, call, take } from "redux-saga/effects";

import {
  getOffset,
  getMessage,
} from "features/rendering/reducer";

import { 
  getPlayerPosition,
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
    const { x: dx, y: dy } = yield select(getOffset);
    for(let x = 1; x < 8; x++) {
      for(let y = 1; y < 8; y++) {
        const coords = yield select(getTileParams, x - dx, y - dy, 'grass');
        context2d.drawImage(...coords);
      }
    }
    for(let [uuid, { x, y }] of positions) {
      const { tileName } = yield select(getTileForEntity, uuid);
      const coords = yield select(getTileParams, x - dx, y - dy, tileName);
      context2d.drawImage(...coords);
    }
    const message = yield select(getMessage);
    if(message) {
      const prevFill = context2d.fillStyle;
      context2d.fillStyle = "white";
      context2d.font = "16px monospace";
      context2d.fillText(message, 6, 12);
      context2d.fillStyle = prevFill;
    }
  }
};

export const renderingSystem = function* (context2d, sourceChannel) {
  while (true) {
    const value = yield take(sourceChannel);
    yield call(renderCanvas, context2d, value);
  }
}

export const resetCameraSystem = function* () {
  yield takeEvery("SET_MOVE_MODE", function* ({ payload }) {
    if(payload.moveMode === "player") {
      const { x, y } = yield select(getPlayerPosition);
      yield put({ type: "RESET_OFFSET", payload: { x: -x, y: -y }});
    }
  });
}
