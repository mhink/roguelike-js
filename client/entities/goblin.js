import { spawnEntity } from "./index"

export default (x, y) => spawnEntity({
  position: { x, y },
  tile: {
    name: "goblin",
  },
  actor: {
    repeat:    true,
    speed:     7,
    eventType: "GOBLIN_AI"
  },
  combat: {
    hp: 5,
    maxHp: 10,
    atk: 2
  },
  appearance: {
    living:  true,
    body:    'humanoid',
    species: 'goblin'
  },
  dispositions: {
    attraction: null,
  }
});
