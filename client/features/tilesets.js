// @flow
/* eslint-disable max-statements */

import type { AppState, Action } from "root-reducer";

export type TilesetsState = {
  images: {
    [path: string]: {
      img: Object,
      sWidth: number,
      sHeight: number,
    }
  },
  tiles: {
    [name: string]: {
      image: string,
      sx0: number,
      sy0: number
    }
  },
  registry: {
    [key: string]: {
      tileName: string
    }
  }
}

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

export default (state: TilesetsState = initialState, action: Action) => {
  switch (action.type) {
    case "REAP_ENTITY": {
      const { uuid } = action.payload;
      const nextRegistry = { ...state.registry };
      delete nextRegistry[uuid];
      return {
        ...state,
        registry: nextRegistry
      }
    }

    case "SPAWN_ENTITY": {
      const { uuid, tileName } = action.payload;
      if (tileName) {
        return {
          ...state,
          registry: {
            ...state.registry,
            [uuid]: {
              tileName
            }
          }
        };
      } else {
        return state;
      }
    }
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
};

export const getTileForEntity = (state: AppState, uuid: string) => state.tilesets.registry[uuid];
export const getTileByName = (state: AppState, name: string) => state.tilesets.tiles[name];
export const getImageByPath = (state: AppState, path: string) => state.tilesets.images[path];

const TILE_HEIGHT_SCALING_FACTOR = 2;
const TILE_WIDTH_SCALING_FACTOR = 2;

// eslint-disable-next-line max-params
export const getTileParams = (state: AppState, dx0: number, dy0: number, name: string) => {
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
