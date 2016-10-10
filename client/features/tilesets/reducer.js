import { every } from "lodash";

const player = require("res/Player0.png");
const floor = require("res/Floor.png");

const initialState = {
  ready: false,
  tiles: {},
  images: {},
  entityRegistry: {},
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SPAWN_ENTITY": {
      const { uuid, tileName } = payload;
      if(tileName) {
        return {
          ...state,
          entityRegistry: {
            ...state.entityRegistry,
            [uuid]: tileName
          }
        };
      } else {
        return state;
      }
    }
    case "REGISTER_TILE": {
      const { name, ...data } = payload;
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [name]: data
        }
      };
    }
    case "REGISTER_IMAGE": {
      const { path, sWidth, sHeight } = payload;
      return { 
        ...state,
        ready: false,
        images: {
          ...state.images,
          [path]: { img: null, sWidth, sHeight }
        }
      };
    }
    case "LOADED_IMAGE": {
      const { path, img } = payload;
      const nextImages = {
        ...state.images,
        [path]: {
          ...state.images[path],
          img
        }
      };

      const ready = every(nextImages, ({ img }) => img);

      return {
        ...state,
        ready,
        images: nextImages
      };
    }
    default: {
      return state;
    }
  }
};

export const getTileForEntity = (state, uuid) => state.tilesets.entityRegistry[uuid];
export const shouldRender = (state) => state.tilesets.ready;
export const getTileByName = (state, name) => state.tilesets.tiles[name];
export const getImageByPath = (state, path) => state.tilesets.images[path];

export const getTileParams = (state, dx0, dy0, name) => {
  const tile  = getTileByName(state, name);
  const image = getImageByPath(state, tile.image);

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
