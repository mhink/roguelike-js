import { spawnEntity } from "./index"

export default (x, y) => spawnEntity({
  player:   true,
  position: { x, y},
  tile: {
    name: "human"
  },
  actor: {
    repeat:    true,
    speed:     10,
    eventType: "PLAYER_INPUT"
  },
  combat: {
    hp: 10,
    maxHp: 10,
    atk: 5
  },
  appearance: {
    living:  true,
    body:    'humanoid',
    species: 'human'
  }
});
