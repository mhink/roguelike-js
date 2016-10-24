import { spawnEntity } from "./index";

export default (x, y) => spawnEntity({
  position: { x, y },
  tile: {
    name: "apple"
  },
  appearance: {
    living: false,
    food: true,
  }
});
