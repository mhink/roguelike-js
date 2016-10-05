import { channel } from "redux-saga";
import { take, put, fork, call } from "redux-saga/effects";

import { initTilesets } from "features/tilesets/sagas";
import { watchKeyboard } from "features/input/sagas";
import { displaySystem } from "features/display/sagas";

const debugSystem = function* (prefix, inputSource) {
  while (true) {
    const value = yield take(inputSource);
    console.log(`[${prefix}]`, value); // eslint-disable-line no-console
  }
};

export default function* rootSaga(context2d) {
  yield call(initTilesets);

  const inputSource = yield call(channel);
  const debugSink = yield call(channel);
  const displaySink = yield call(channel);

  yield [
    fork(watchKeyboard, inputSource),
    fork(debugSystem, "DEBUG", debugSink),
    fork(displaySystem, context2d, displaySink)
  ];

  yield put(displaySink, "@@INIT");

  yield fork(function* () {
    while (true) {
      const input = yield take(inputSource);
      yield put(debugSink, input);
      yield put(displaySink, input);
    }
  });
}
