/* eslint-disable no-magic-numbers */
import { put, fork, call, select } from "redux-saga/effects";

import { 
  rawKeyboardChannel, 
  takeAsCommand
} from "keyboard-saga-helpers";

import {
  mouseChannel,
  takeEveryMouse
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

const coreLoop = function* (rkChan) {
  const task = yield fork(function* () {
    let exiting = false;
    do {
      const command = yield call(takeAsCommand, rkChan);
      if (!command) continue;

      const shouldRun = yield call(runCommandSaga, command);
      if (!shouldRun) continue;

      exiting = yield call(runEventSaga);

    } while (!exiting);

    yield put(setScreenMessage("Game over."));
  });
  return task;
}

function* nudgeVecField(coords) {
  const { x:dx, y:dy } = yield select(getOffset);
  yield put({
    type: "DECAY_VECTOR_FIELD",
    payload: {
      decayFactor: 0.5
    }
  });
  yield put({
    type: "NUDGE_VECTOR_FIELD",
    payload: {
      cutoff: 0.05,
      intensity: 5,
      point: {
        x: coords.x+dx, 
        y: coords.y+dy,
      }
    }
  });
}

export default function* rootSaga(canvas) {
  const rkChan = yield rawKeyboardChannel(canvas);
  const ipcChan = yield ipcChannel("ipc-saga");
  const mouseChan = yield mouseChannel(canvas);

  yield* initializeGame();
  yield [
    fork(coreLoop, rkChan),
    fork(takeEveryIpc, ipcChan, logIpc),
    fork(takeEveryMouse, mouseChan, nudgeVecField),
  ];

  yield put({ type: "START_RENDERING" });
  yield put(createVectorField(38, 38));
}
