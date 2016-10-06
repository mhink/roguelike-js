import { select, put, call, take } from "redux-saga/effects";

import { 
  getLayer,
  getLayerCount,
} from "features/maps/selectors";

import {
  shouldRender,
  getTileByName,
  getImageByPath,
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
          const name = layer[y][x];
          const tile = yield select(getTileByName, name);
          const image = yield select(getImageByPath, tile.image);

          const { x: cx, y: cy } = tile.coords;
          const { x: tx, y: ty } = image.tileSize;
          const sx = cx * tx;
          const sy = cy * ty;
          const dx = 4 * x * tx;
          const dy = 4 * y * ty;
          const dWidth = 4 * tx;
          const dHeight = 4 * ty;
          context2d.drawImage(
            image.img,
            sx, sy,
            tx, ty,
            dx, dy,
            dWidth, dHeight
          );
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
