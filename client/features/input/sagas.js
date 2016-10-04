import { eventChannel } from "redux-saga";
import { cancelled, take, select, put } from "redux-saga/effects";
import { actionForKeySelector } from "./selectors";

const subscribeToKeyboard = (emitter) => {
  const keyboardListener = (keyboardEvent) => {
    emitter({ keyboardEvent });
  };

  document.addEventListener("keydown", keyboardListener);

  return () => {
    document.removeEventListener("keydown", keyboardListener);
  };
};

export const watchKeyboard = function* (inputSink) {
  const rawKeyboardEventSource = yield eventChannel(subscribeToKeyboard);

  try {
    while (true) {
      const { keyboardEvent } = yield take(rawKeyboardEventSource);
      const action = yield select(actionForKeySelector, keyboardEvent.code);
      if (action) {
        yield put(inputSink, action);
      }
    }
  } finally {
    if (yield cancelled()) {
      rawKeyboardEventSource.close();
    }
  }
};
