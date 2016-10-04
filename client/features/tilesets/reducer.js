const player = require("res/Player0.png");
const floor = require("res/Floor.png");

const initialState = {
  render: false,
  tiles: {
    "player": { image: player, coords: { x: 0, y: 0 } },
    "grass": { image: floor, coords: { x: 8, y: 7 } }
  },
  images: {
    [player]: { img: null, tileSize: { x: 16, y: 16 } },
    [floor]: { img: null, tileSize: { x: 16, y: 16 } }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADED_IMAGES": {
      const { loadedImages } = action.payload;
      const nextImages = { ...state.images };
      for (const { path, img } of loadedImages) {
        nextImages[path].img = img;
      }
      return {
        ...state,
        images: nextImages,
        render: true
      };
    }
    default: {
      return state;
    }
  }
};
