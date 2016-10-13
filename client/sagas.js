import { v4 as uuid } from "uuid";
import { channel } from "redux-saga";
import { take, put, fork, call } from "redux-saga/effects";

import { watchKeyboard } from "features/input/sagas";
import { renderingSystem, resetCameraSystem } from "features/rendering/sagas";
import { initTilesets, tilesetLoader } from "features/tilesets/sagas";

export default function* rootSaga(context2d) {
  const inputSource = yield call(channel);

  const renderingSink = yield call(channel);
  yield [
    fork(watchKeyboard, inputSource),
    fork(renderingSystem, context2d, renderingSink),
    fork(resetCameraSystem)
  ];

  yield put({ type: "SPAWN_ENTITY", payload: {
    uuid: uuid(),
    player: true,
    position: { x: 4, y: 4 },
    tileName: "player",
  }});

  yield call(initTilesets);
  yield put(renderingSink, "@@INIT");

  yield fork(function* () {
    while (true) {
      const command = yield take(inputSource);
      yield put(command);
      yield put(renderingSink, command);
    }
  });
}
