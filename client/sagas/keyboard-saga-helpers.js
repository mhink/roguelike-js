/* eslint no-shadow: ["error", { "allow": ["rawKeyboardChannel"] }] */
import { eventChannel } from "redux-saga";
import { put, call, fork, cancelled, take, select } from "redux-saga/effects";
import { commandForKeySelector } from "features/input";
import {
  shouldRunSimulation
} from "features/input";

const subscribeToKeyboard = (emitter) => {
  const keyboardListener = (keyboardEvent) => {
    emitter({ keyboardEvent });
  };

  document.addEventListener("keydown", keyboardListener);

  return () => {
    document.removeEventListener("keydown", keyboardListener);
  };
};

export const rawKeyboardChannel = () => eventChannel(subscribeToKeyboard);
export const takeEveryAsCommand = function* (rawKeyboardChannel, commandSaga, eventSaga, ...args) {
  const task = yield fork(function* () {
    try {
      while (true) {
        const { keyboardEvent } = yield take(rawKeyboardChannel);
        const command = yield select(commandForKeySelector, keyboardEvent.code);
        if (command) {
          const shouldRun = yield call(commandSaga, ...args.concat(command));
          if (!shouldRun) {
            continue;
          }
        } else {
          console.warn(`No command is mapped to ${keyboardEvent.code}!`);
          continue;
        }
        yield call(eventSaga);
      }
    } finally {
      if (yield cancelled()) {
        rawKeyboardChannel.close();
      }
    }
  });
  return task;
};
