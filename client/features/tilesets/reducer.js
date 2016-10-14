// @flow

import { every } from "lodash";
import type { AppState, Action } from "root-reducer";

const player = require("res/Player0.png");
const floor = require("res/Floor.png");

export type TilesetsState = {
  ready: boolean,
  images: {
    [path: string]: {
      img: ?Object,
      sWidth: number,
      sHeight: number,
    }
  },
  tiles: {
    [name: string]: {
      image: string,
      sx0:   number,
      sy0:   number
    }
  },
  registry: {
    [key: string]: {
      tileName: string
    }
  }
}

const initialState = {
  tiles: {},
  images: {},
  registry: {},
};

export default (state : TilesetsState = initialState, action : Action) => {
  switch (action.type) {
    case "SPAWN_ENTITY": {
      const { uuid, tileName } = action.payload;
      if(tileName) {
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
    case "REGISTER_TILE": {
      const { name, ...data } = action.payload;
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [name]: data
        }
      };
    }
    case "REGISTER_IMAGE": {
      const { path, sWidth, sHeight } = action.payload;
      return { 
        ...state,
        images: {
          ...state.images,
          [path]: { img: null, sWidth, sHeight }
        }
      };
    }
    case "LOADED_IMAGE": {
      const { path, img } = action.payload;
      const nextImages = {
        ...state.images,
        [path]: {
          ...state.images[path],
          img
        }
      };

      return {
        ...state,
        images: nextImages
      };
    }
    default: {
      return state;
    }
  }
};

export const getTileForEntity = (state : AppState, uuid : string) => state.tilesets.registry[uuid];
export const getTileByName = (state : AppState, name : string) => state.tilesets.tiles[name];
export const getImageByPath = (state : AppState, path : string) => state.tilesets.images[path];

export const getTileParams = (state : AppState, dx0 : number, dy0 : number, name : string) => {
  const tile  = getTileByName(state, name);
  if(!tile) {
    throw new Error(`Couldn't find a tile named ${name}`);
  }
  const image = getImageByPath(state, tile.image);
  if(!image) {
    throw new Error(`Couldn't find an image named ${tile.image}`);
  }

  const { sx0, sy0 } = tile;
  const { sWidth, sHeight } = image;
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
};
