import { eventChannel } from "redux-saga";
import { cancelled, take, fork, call, select, put } from 'redux-saga/effects';
import { actionForKeySelector } from './selectors';

const subscribeToKeyboard = (emitter) => {
  const keyboardListener = (keyboardEvent) => {
    emitter({ keyboardEvent });
  };

  document.addEventListener('keydown', keyboardListener);

  return () => {
    document.removeEventListener('keydown', keyboardListener);
  };
};

export function *watchKeyboard(inputSink) {
  console.log("Beginning watchKeyboard with sink:", inputSink);
  const rawKeyboardEventSource = yield eventChannel(subscribeToKeyboard);

  try {
    while(true) {
      const { keyboardEvent } = yield take(rawKeyboardEventSource);
      const action = yield select(actionForKeySelector, event.code);
      if(action) {
        yield put(inputSink, action);
      }
    }
  } finally {
    if(yield cancelled()) {
      rawKeyboardEventSource.close();
    }
  }
}
