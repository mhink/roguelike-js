import { put, call } from "redux-saga/effects";

import { registerTile } from "features/tilesets";
import { spawnPlayer, spawnGoblin, spawnFood } from "entities";
import { createMap } from "features/maps";
import { loadAndRegisterImage } from "./load-image-promise.js";

import { player, floor, food, wall } from "res";
export default function* () {
  yield [
    call(loadAndRegisterImage, player, { x: 16, y: 16 }),
    call(loadAndRegisterImage, floor, { x: 16, y: 16 }),
    call(loadAndRegisterImage, food, { x: 16, y: 16 }),
    call(loadAndRegisterImage, wall, { x: 16, y: 16 }),
  ];

  yield put(registerTile("apple", { x: 0, y: 2 }, food.image));
  yield put(createMap("blank", 38, 38));

  yield put(spawnPlayer(8, 8));
  yield put(spawnGoblin(1, 1));
  // yield put(spawnFood(10,2));
};
