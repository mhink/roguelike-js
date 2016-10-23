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

export const registerTile = (name, { x: stx, y: sty }, image) => ({
  type:    "REGISTER_TILE",
  payload: {
    name,
    image,
    stx,
    sty
  }
});

export default entityReducer("tile", (state = initialState, action) => {
  switch (action.type) {
    case "BATCH_REGISTER_TILES": {
      const { image, tiles } = action.payload;
      const newTiles = { ...state.tiles };
      for (const tile of tiles) {
        const [name, stx, sty] = tile;
        newTiles[name] = { image, stx, sty };
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
export const getTileParams = (state, name) => {
  const tile = getTileByName(state, name);
  if (!tile) {
    throw new Error(`Couldn't find a tile named ${name}`);
  }

  const image = getImageByPath(state, tile.image);
  if (!image) {
    throw new Error(`Couldn't find an image named ${tile.image}`);
  }

  const { stx, sty } = tile;
  const { sWidth, sHeight } = image;
  const [sx, sy] = [stx * sWidth, sty * sHeight];
  return {
    img: image.img,
    sx, sy,
    sWidth, sHeight
  };
};
