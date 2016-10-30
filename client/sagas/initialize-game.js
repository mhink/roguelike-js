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

  yield put(registerTile("apple", { x: 0, y: 2 }, food.path));
  yield put(registerTile("wall", { x: 1, y: 4 }, wall.path));
  yield put(createMap({
    tiles: {
      background: "blank",
      wall: "wall"
    },
    size: {
      x: 5,
      y: 5
    }
  }));

  yield put(spawnPlayer(0, 0));
  //yield put(spawnGoblin(1, 1));
  // yield put(spawnFood(10,2));
};
