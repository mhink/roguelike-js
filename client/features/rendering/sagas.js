import { select, put, call, take } from "redux-saga/effects";

import { 
  getLayer,
  getLayerCount,
} from "features/maps/selectors";

import {
  shouldRender,
  getTileParams
} from "features/tilesets/selectors";

const renderCanvas = function* (context2d, value) {
  const sx = context2d.canvas.clientWidth;
  const sy = context2d.canvas.clientHeight;
  context2d.fillRect(0,0,sx,sy);

  if(yield select(shouldRender)) {
    const layerCount = yield select(getLayerCount);

    for(let i = 0; i < layerCount; i++) {
      const layer = yield select(getLayer, i);
      for(let y = 0; y < layer.length; y++) {
        for(let x = 0; x < layer[y].length; x++) {
          const tileName = layer[y][x];
          const coords = yield select(getTileParams, x, y, tileName);
          context2d.drawImage(...coords);
        }
      }
    }
  }
};

export const renderingSystem = function* (context2d, sourceChannel) {
  while (true) {
    const value = yield take(sourceChannel);
    yield call(renderCanvas, context2d, value);
  }
}
