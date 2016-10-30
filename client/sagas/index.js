/* eslint-disable no-magic-numbers */
import { put, fork, call, select, race } from "redux-saga/effects";

import { 
  rawKeyboardChannel, 
  takeAsCommand
} from "keyboard-saga-helpers";

import {
  rawMouseChannel,
  takeAsTileClick
} from "mouse-saga-helpers";

import { 
  ipcChannel, 
  takeEveryIpc 
} from "ipc-saga-helpers";

import { 
  createVectorField,
} from "features/vecfield";

import runCommandSaga from "./run-command";
import runEventSaga from "./run-events";
import initializeGame from "./initialize-game";
import logIpc from "./log-ipc";
import { 
  setScreenMessage,
  getOffset
} from "features/rendering";

const coreLoop = function* (kbChan, mouseChan) {
  const task = yield fork(function* () {
    let exiting = false;
    do {
      const { keyboardCommand, mouseCommand } = yield race({
        keyboardCommand: call(takeAsCommand, kbChan),
        mouseCommand:    call(takeAsTileClick, mouseChan)
      });

      if (mouseCommand) {
        console.log(`Heard a click on tile ${mouseCommand}`);
        continue;
      }

      if (!keyboardCommand) continue;

      const shouldRun = yield call(runCommandSaga, keyboardCommand);
      if (!shouldRun) continue;

      exiting = yield call(runEventSaga);

    } while (!exiting);

    yield put(setScreenMessage("Game over."));
  });
  return task;
}

export default function* rootSaga(canvas) {
  const kbChan = yield rawKeyboardChannel(canvas);
  const mouseChan = yield rawMouseChannel(canvas);
  const ipcChan = yield ipcChannel("ipc-saga");

  yield* initializeGame();
  yield [
    fork(coreLoop, kbChan, mouseChan),
    fork(takeEveryIpc, ipcChan, logIpc),
  ];

  yield put({ type: "START_RENDERING" });
  yield put(createVectorField(38, 38));
}
