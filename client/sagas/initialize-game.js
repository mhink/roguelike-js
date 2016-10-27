import { put, call } from "redux-saga/effects";

import {
  registerImage,
  registerTile,
  batchRegisterTiles
} from "features/tilesets";
import player from "res/Player0.png";
import floor from "res/Floor.png";
import food from "res/Food.png";
import playerTiledefs from "res/Player0.tiledefs.js";
import floorTiledefs from "res/Floor.tiledefs.js";
import loadImage from "./load-image-promise.js";

import { 
  spawnPlayer,
  spawnGoblin,
  spawnFood,
} from "entities";
import { createMap } from "features/maps";

export default function* () {
  const playerImage = yield call(loadImage, player);
  const floorImage = yield call(loadImage, floor);
  const foodImage = yield call(loadImage, food);
  yield put(registerImage(player, playerImage, { x: 16, y: 16 }));
  yield put(registerImage(floor, floorImage, { x: 16, y: 16 }));
  yield put(registerImage(food, foodImage, { x: 16, y: 16 }));
  yield put(batchRegisterTiles(player, playerTiledefs));
  yield put(batchRegisterTiles(floor, floorTiledefs));
  yield put(registerTile("apple", { x: 0, y: 2 }, food));
  yield put(createMap("blank", 38, 38));

  yield put(spawnPlayer(8, 8));
  // yield put(spawnGoblin(1, 1));
  // yield put(spawnFood(10,2));
};
