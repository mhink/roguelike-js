import { select, call, put } from 'redux-saga/effects';
import SAGA_FOR_EVENT from "gameEvents";

import { 
  runClock, 
  getCurrentEvent,
  getSimulationComponent
} from "features/simulator";

import {
  getGameOver
} from "features/player";

// TODO: unfuck this control flow
export default function* () {
  for(let i = 0; i < 10; i++) {
    const currentEvent = yield select(getCurrentEvent);

    if (!currentEvent)
      return;

    const { uuid } = currentEvent;
    const event = yield select(getSimulationComponent, uuid);

    yield put(runClock());

    if (!event) 
      return;

    if (event.eventType === "PLAYER_INPUT") 
      return;

    const eventSaga = SAGA_FOR_EVENT[event.eventType];

    if (!eventSaga) {
      console.warn(`No handler for eventType (${event.eventType}), skipping forward`);
    }

    yield call(eventSaga, uuid);

    const gameOver = yield select(getGameOver);

    if (gameOver){
      return true;
    }
  };
}
