import { select, put } from "redux-saga/effects";

import {
  getCurrentMapDimensions
} from "features/maps";

import {
  spawnEntity
} from "spawn-entity-action";

export default function* () {
  const { x: sx, y: sy } = yield select(getCurrentMapDimensions);
  const rx = Math.floor(Math.random() * sx);
  const ry = Math.floor(Math.random() * sy);

  yield put(spawnEntity({
    position: { x: rx, y: ry },
    tile: {
      name: "goblin"
    },
    actor: {
      repeat: true,
      speed: 7,
      eventType: "GOBLIN_AI"
    },
    combat: {
      hp: 5,
      maxHp: 5,
      atk: 2
    }
  }));
}
