/* eslint-disable no-magic-numbers */
import { put, fork, call, select } from "redux-saga/effects";

import { 
  rawKeyboardChannel, 
  takeAsCommand
} from "keyboard-saga-helpers";

import {
  mouseChannel
} from "mouse-saga-helpers";

import { 
  ipcChannel, 
  takeEveryIpc 
} from "ipc-saga-helpers";

import runCommandSaga from "./run-command";
import runEventSaga from "./run-events";
import initializeGame from "./initialize-game";
import logIpc from "./log-ipc";

import goblinAi from "gameEvents/goblin-ai";
import { getDebugDisposition } from "features/disposition";

const coreLoop = function* (canvas) {
  const gobuuid = yield select(getDebugDisposition);
  yield call(goblinAi, gobuuid);

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
