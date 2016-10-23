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

export const takeAsCommand = function* (rawKeyboardChannel) {
  try {
    const { keyboardEvent } = yield take(rawKeyboardChannel);
    const command = yield select(commandForKeySelector, keyboardEvent.code);
    if (command) {
      return command;
    } else {
      console.warn(`No command is mapped to ${keyboardEvent.code}!`);
      return;
    }
  } finally {
    if (yield cancelled()) {
      rawKeyboardChannel.close();
    }
  }
};
