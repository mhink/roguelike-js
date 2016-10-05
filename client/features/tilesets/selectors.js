export const shouldRender = (state) => state.tilesets.render;
export const getTileByName = (state, name) => state.tilesets.tiles[name];
export const getImageByPath = (state, path) => state.tilesets.images[path];
