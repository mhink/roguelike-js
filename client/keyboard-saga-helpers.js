import { eventChannel } from "redux-saga";
import { fork, cancelled, take, select, put } from "redux-saga/effects";
import { commandForKeySelector } from "features/input";

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
export const takeEveryAsCommand = function* (rawKeyboardChannel, saga, ...args) {
  const task = yield fork(function* () {
    try {
      while (true) {
        const { keyboardEvent } = yield take(rawKeyboardChannel);
        const command = yield select(commandForKeySelector, keyboardEvent.code);
        if (command) {
          yield fork(saga, ...args.concat(command));
        }
      }
    } finally {
      if (yield cancelled()) {
        rawKeyboardChannel.close();
      }
    }
  });
  return task;
}
