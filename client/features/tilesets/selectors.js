export const shouldRender = (state) => state.tilesets.render;
export const getTileByName = (state, name) => state.tilesets.tiles[name];
export const getImageByPath = (state, path) => state.tilesets.images[path];

export const getTileParams = (state, dx0, dy0, name) => {
  const tile  = getTileByName(state, name);
  const image = getImageByPath(state, tile.image);

  const { x: sx0, y: sy0} = tile.coords;
  const { x: sWidth, y: sHeight } = image.tileSize;
  const sx      = sx0 * sWidth;
  const sy      = sy0 * sHeight;

  const dx      = 4 * dx0 * sWidth;
  const dy      = 4 * dy0 * sHeight;
  const dWidth  = 4 * sWidth;
  const dHeight = 4 * sHeight;

  return [
    image.img, 
    sx, sy, 
    sWidth, sHeight,
    dx, dy,
    dWidth, dHeight
  ];
}
