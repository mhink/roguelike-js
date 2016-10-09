import { channel } from "redux-saga";
import { take, put, fork, call } from "redux-saga/effects";

import { initTilesets } from "features/tilesets/sagas";
import { watchKeyboard } from "features/input/sagas";
import { renderingSystem } from "features/rendering/sagas";

export default function* rootSaga(context2d) {
  yield call(initTilesets);

  const inputSource = yield call(channel);
  const renderingSink = yield call(channel);

  yield [
    fork(watchKeyboard, inputSource),
    fork(renderingSystem, context2d, renderingSink)
  ];

  yield put(renderingSink, "@@INIT");

  yield fork(function* () {
    while (true) {
      const input = yield take(inputSource);
      yield put(renderingSink, input);
    }
  });
}
