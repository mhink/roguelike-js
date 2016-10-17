/* eslint no-shadow: ["error", { "allow": ["rawKeyboardChannel"] }] */
import { eventChannel } from "redux-saga";
import { put, call, fork, cancelled, take, select } from "redux-saga/effects";
import { commandForKeySelector } from "features/input";
import {
  entityCanMoveTo
} from "features/maps";

import { 
  runClock, 
  getCurrentEvent,
  getSimulationComponent
} from "features/simulator";

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

const EVENT_HANDLERS = {
  GOBLIN_AI: function* (uuid) {
    console.log("running goblin ai");
    const dx = Math.floor(Math.random() * 3) - 1;
    const dy = Math.floor(Math.random() * 3) - 1;

    const canMove = yield select(entityCanMoveTo, uuid, { dx, dy });
    if (canMove) {
      yield put({
        type:    "MOVE_ENTITY",
        payload: {
          uuid,
          dx,
          dy,
        }
      });
    }
  },
};

export const rawKeyboardChannel = () => eventChannel(subscribeToKeyboard);
export const takeEveryAsCommand = function* (rawKeyboardChannel, saga, ...args) {
  const task = yield fork(function* () {
    try {
      while (true) {
        const currentEvent = yield select(getCurrentEvent);
        if (currentEvent) {
          const { uuid } = currentEvent;
          const event = yield select(getSimulationComponent, uuid);
          if (event.eventType === "PLAYER_INPUT") {
            console.log("running player input");
            const { keyboardEvent } = yield take(rawKeyboardChannel);
            const command = yield select(commandForKeySelector, keyboardEvent.code);
            if (command) {
              yield fork(saga, ...args.concat(command));
              if(yield select(shouldRunSimulation)) {
                yield put(runClock());
              }
            } else {
              console.warn(`No command is mapped to ${keyboardEvent}!`);
            }
          } else {
            const handler = EVENT_HANDLERS[event.eventType];
            if (handler) {
              yield call(handler, uuid);
              yield put(runClock());
            } else {
              console.warn(`No handler for eventType (${event.eventType}), skipping forward`);
              yield put(runClock());
            }
          }
        } else {
          console.warn("No event is next!");
          yield take(rawKeyboardChannel);
        }
      }
    } finally {
      if (yield cancelled()) {
        rawKeyboardChannel.close();
      }
    }
  });
  return task;
};
