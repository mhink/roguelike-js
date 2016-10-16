import { v4 as uuid } from "uuid";

export const spawnEntity = (payload) => ({
  type:    "SPAWN_ENTITY",
  payload: {
    uuid: uuid(),
    ...payload
  }
});
