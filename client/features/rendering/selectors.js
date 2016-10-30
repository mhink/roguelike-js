export const backgroundTiles = function* (state: AppState) {
  const currentMapUuid = state.maps.currentMap;
  const { background, dimensions } = state.maps.maps[currentMapUuid];
  const { x: ssx, y: ssy } = state.rendering.screenSize;
  const { x: sx, y: sy } = dimensions;
  const { x: dx, y: dy } = state.rendering.offset;

  const x0 = -dx < 0 ? 0 : -dx;
  const y0 = -dy < 0 ? 0 : -dy;
  const x1 = sx - dx >= ssx ? ssx : sx - dx;
  const y1 = sy - dy >= ssy ? ssy : sy - dy;

  for (let x = x0; x < x1; x++) {
    for (let y = y0; y < y1; y++) {
      yield { x, y, tileName: background };
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
