import { v4 as uuid } from "uuid";

export const toggleWall = (x, y) => {
  return {
    type: "TOGGLE_WALL",
    payload: {
      point: { x, y }
    }
  };
};

const defaultTiles = {
  background: "blank",
  wall: "wall"
};

const defaultSize = {
  x: 4,
  y: 4
};

export const createMap = ({tiles = defaultTiles, size = defaultSize}) => {
  return { type: "CREATE_MAP", payload: {
    uuid: uuid(),
    size,
    tiles,
  }};
};
