import { put, call } from "redux-saga/effects";

import {
  registerImage,
  registerTile,
  batchRegisterTiles
} from "features/tilesets";
import player from "res/Player0.png";
import floor from "res/Floor.png";
import playerTiledefs from "res/Player0.tiledefs.js";
import floorTiledefs from "res/Floor.tiledefs.js";
import loadImage from "./load-image-promise.js";
import { spawnEntity } from "spawn-entity-action";
import { createMap } from "features/maps";

export default function* () {
  const playerImage = yield call(loadImage, player);
  const floorImage = yield call(loadImage, floor);
  yield put(registerImage(player, playerImage, { x: 16, y: 16 }));
  yield put(registerImage(floor, floorImage, { x: 16, y: 16 }));
  yield put(batchRegisterTiles(player, playerTiledefs));
  yield put(batchRegisterTiles(floor, floorTiledefs));
  yield put(createMap("grass-night", 17, 17));
  yield put(spawnEntity({
    player:   true,
    position: { x: 8, y: 8 },
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
  }));
  yield put(spawnEntity({
    position: { x: 1, y: 1 },
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
    disposition: {
      attractionMap: null,
      repulsionMap: null
    }
  }));
};
