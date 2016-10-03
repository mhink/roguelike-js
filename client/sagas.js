import { channel } from "redux-saga";
import { take, put, fork, call } from "redux-saga/effects";

import { initTilesets } from "features/tilesets/sagas";
import { watchKeyboard } from "features/input/sagas";

function *debugSystem(prefix, inputSource) {
  while(true) {
    const value = yield take(inputSource);
    console.log(`[${prefix}]`, value);
  }
}

export default function *rootSaga() {
  yield call(initTilesets);

  const inputSource = yield call(channel);
  const debugSink = yield call(channel);

  yield fork(function* () {
    while(true) {
      yield put(debugSink, yield take(inputSource));
    }
  });

  yield [
    fork(watchKeyboard, inputSource),
    fork(debugSystem, "DEBUG", debugSink),
  ];
}
