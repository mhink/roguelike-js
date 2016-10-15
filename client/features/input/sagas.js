import { eventChannel } from "redux-saga";
import { cancelled, take, select, put } from "redux-saga/effects";
import { actionForKeySelector } from "./reducer";

const subscribeToKeyboard = (emitter) => {
  const keyboardListener = (keyboardEvent) => {
    emitter({ keyboardEvent });
  };

  document.addEventListener("keydown", keyboardListener);

  return () => {
    document.removeEventListener("keydown", keyboardListener);
  };
};

export const watchKeyboard = function* (commandSink) {
  const rawKeyboardEventSource = yield eventChannel(subscribeToKeyboard);

  try {
    while (true) {
      const { keyboardEvent } = yield take(rawKeyboardEventSource);
      const action = yield select(actionForKeySelector, keyboardEvent.code);
      if (action) {
        yield put(commandSink, action);
      }
    }
  } finally {
    if (yield cancelled()) {
      rawKeyboardEventSource.close();
    }
  }
};
