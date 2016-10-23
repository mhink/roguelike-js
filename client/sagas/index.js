/* eslint-disable no-magic-numbers */
import { put, fork, call } from "redux-saga/effects";

import { 
  rawKeyboardChannel, 
  takeAsCommand
} from "keyboard-saga-helpers";

import { 
  ipcChannel, 
  takeEveryIpc 
} from "ipc-saga-helpers";

import runCommandSaga from "./run-command";
import runEventSaga from "./run-events";
import initializeGame from "./initialize-game";
import logIpc from "./log-ipc";

const coreLoop = function* (canvas) {
  const task = yield fork(function* () {
    const rkChan = yield rawKeyboardChannel(canvas);

    while (true) {
      const command = yield call(takeAsCommand, rkChan);
      if (!command) continue;

      const shouldRun = yield call(runCommandSaga, command);
      if (!shouldRun) continue;

      yield call(runEventSaga);
    }
  });
  return task;
}

export default function* rootSaga(canvas) {
  const ipcChan = yield ipcChannel("ipc-saga");

  yield* initializeGame();

  yield put({ type: "START_RENDERING" });

  yield [
    fork(coreLoop),
    fork(takeEveryIpc, ipcChan, logIpc)
  ];
}
