// TODO: this function does way too much. Most of this logic should live
// in renderer/render-map.js
export const backgroundTiles = function* (state: AppState) {
  const currentMapUuid = state.maps.currentMap;
  const { walls, tiles, size } = state.maps.maps[currentMapUuid];
  const { x: ssx, y: ssy } = state.rendering.screenSize;
  const { x: sx, y: sy } = size;
  const { x: dx, y: dy } = state.rendering.offset;

  const x0 = -dx < 0 ? 0 : -dx;
  const y0 = -dy < 0 ? 0 : -dy;
  const x1 = sx - dx >= ssx ? ssx : sx - dx;
  const y1 = sy - dy >= ssy ? ssy : sy - dy;

  for (let x = x0; x < x1; x++) {
    for (let y = y0; y < y1; y++) {
      const i = ((y+dy) * sx + (x+dx) % sx);

      if(walls[i] > 0) {
        yield { x, y, tileName: tiles.wall };
      } else {
        yield { x, y, tileName: tiles.background };
      }
    }
  }
};
export const getScreenSizePx = (state: AppState) => state.rendering.screenSizePx;
export const getTileSizePx = (state: AppState) => state.rendering.tileSizePx;
export const getScreenSize = (state: AppState) => state.rendering.screenSize;
export const shouldRender = (state: AppState) => state.rendering.ready;
export const getMessage = (state) => state.rendering.message;
export const getOffset = (state) => state.rendering.offset;
export const getMidpoint = (state) => state.rendering.midpoint;
export const getCameraFrozen = (state) => state.rendering.isCameraFrozen;

export const getTileForPixel = (state, px, py) => {
  const { x: tsx, y: tsy } = getTileSizePx(state);
  return {
    x: Math.floor(px / tsx), 
    y: Math.floor(py / tsy)
  };
};
