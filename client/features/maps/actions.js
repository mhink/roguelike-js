import { v4 as uuid } from "uuid";

export const toggleWall = (x, y) => {
  return {
    type: "TOGGLE_WALL",
    payload: {
      point: { x, y }
    }
  };
};

export const createMap = (background, x, y, wallTile) => {
  const walls = new Uint8Array(x*y);
  return {
    type:    "CREATE_MAP",
    payload: {
      uuid:       uuid(),
      background,
      wallTile,
      size: {
        x, y
      },
      walls
    }
  };
};
