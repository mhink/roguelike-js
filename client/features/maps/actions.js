import { v4 as uuid } from "uuid";

export const createMap = (background, x, y) => ({
  type:    "CREATE_MAP",
  payload: {
    uuid:       uuid(),
    background,
    dimensions: {
      x, y
    }
  }
});
