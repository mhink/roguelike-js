import { channel } from "redux-saga";
import { take, put, fork, call } from "redux-saga/effects";

import { watchKeyboard } from "features/input/sagas";
import { renderingSystem } from "features/rendering/sagas";
import { initTilesets, tilesetLoader } from "features/tilesets/sagas";

export default function* rootSaga(context2d) {
  const inputSource = yield call(channel);

  const renderingSink = yield call(channel);
  yield [
    fork(watchKeyboard, inputSource),
    fork(renderingSystem, context2d, renderingSink)
  ];

  yield call(initTilesets);
  yield put(renderingSink, "@@INIT");

  yield fork(function* () {
    while (true) {
      const input = yield take(inputSource);
      yield put(renderingSink, input);
    }
  });
}
