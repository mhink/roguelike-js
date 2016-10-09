import { every } from "lodash";

const player = require("res/Player0.png");
const floor = require("res/Floor.png");

const initialState = {
  ready: false,
  tiles: {},
  images: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
