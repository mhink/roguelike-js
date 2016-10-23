// @flow
/* eslint-disable max-statements */

import entityReducer from "util/entity-reducer";

const initialState = {
  tiles:    {},
  images:   {},
  registry: {}
};

export const registerImage = (path, img, { x: sWidth, y: sHeight }) => ({
  type:    "REGISTER_IMAGE",
  payload: {
    path,
    img,
    sWidth,
    sHeight
  }
});

export const batchRegisterTiles = (image, tiles) => ({
  type:    "BATCH_REGISTER_TILES",
  payload: {
    image,
    tiles
  }
});

export const registerTile = (name, { x: sx0, y: sy0 }, image) => ({
  type:    "REGISTER_TILE",
  payload: {
    name,
    image,
    sx0,
    sy0
  }
});

export default entityReducer("tile", (state = initialState, action) => {
  switch (action.type) {
    case "BATCH_REGISTER_TILES": {
      const { image, tiles } = action.payload;
      const newTiles = { ...state.tiles };
      for (const tile of tiles) {
        const [name, sx0, sy0] = tile;
        newTiles[name] = { image, sx0, sy0 };
      }

      return {
        ...state,
        tiles: newTiles
      };
    }
    case "REGISTER_TILE": {
      const { name, ...tileData } = action.payload;
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [name]: tileData
        }
      };
    }
    case "REGISTER_IMAGE": {
      const { path, ...imageData } = action.payload;
      return {
        ...state,
        images: {
          ...state.images,
          [path]: imageData
        }
      };
    }
    default: {
      return state;
    }
  }
});

export const getTileForEntity = (state, uuid) => state.tilesets.registry[uuid];
export const getTileByName = (state, name) => state.tilesets.tiles[name];
export const getImageByPath = (state, path) => state.tilesets.images[path];

const TILE_HEIGHT_SCALING_FACTOR = 2;
const TILE_WIDTH_SCALING_FACTOR = 2;

// eslint-disable-next-line max-params
export const getTileParams = (state, dx0, dy0, name) => {
  const tile = getTileByName(state, name);
  if (!tile) {
    throw new Error(`Couldn't find a tile named ${name}`);
  }
  const image = getImageByPath(state, tile.image);
  if (!image) {
    throw new Error(`Couldn't find an image named ${tile.image}`);
  }

  const { sx0, sy0 } = tile;
  const { sWidth, sHeight } = image;
  const sx = sx0 * sWidth;
  const sy = sy0 * sHeight;

  const dx = dx0 * sWidth * TILE_WIDTH_SCALING_FACTOR;
  const dy = dy0 * sHeight * TILE_HEIGHT_SCALING_FACTOR;
  const dWidth = sWidth * TILE_WIDTH_SCALING_FACTOR;
  const dHeight = sHeight * TILE_HEIGHT_SCALING_FACTOR;

  return [
    image.img,
    sx, sy,
    sWidth, sHeight,
    dx, dy,
    dWidth, dHeight
  ];
};
