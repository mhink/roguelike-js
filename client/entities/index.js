import { v4 as uuid } from "uuid";

export spawnGoblin from "./goblin";
export spawnPlayer from "./player";
export spawnFood from "./food";

export const spawnEntity = (payload) => ({
  type:    "SPAWN_ENTITY",
  payload: {
    uuid: uuid(),
    ...payload
  }
});
