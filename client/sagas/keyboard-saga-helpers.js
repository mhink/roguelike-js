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
      input_loop:
      while (true) {
        const { keyboardEvent } = yield take(rawKeyboardChannel);
        const command = yield select(commandForKeySelector, keyboardEvent.code);
        if (command) {
          yield fork(commandSaga, ...args.concat(command));
          const shouldRun = yield select(shouldRunSimulation);
          if (!shouldRun) {
            continue input_loop;
          }
        } else {
          console.warn(`No command is mapped to ${keyboardEvent}!`);
          continue input_loop;
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
