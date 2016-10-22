import { select, call, put } from 'redux-saga/effects';
import SAGA_FOR_EVENT from "gameEvents";

import { 
  runClock, 
  getCurrentEvent,
  getSimulationComponent
} from "features/simulator";

export default function* () {
  while (true) {
    const currentEvent = yield select(getCurrentEvent);
    if (!currentEvent) {
      console.warn("No event is next!");
      break;
    }
    const { uuid } = currentEvent;
    const event = yield select(getSimulationComponent, uuid);

    yield put(runClock());

    if (event.eventType === "PLAYER_INPUT") {
      break;
    }

    const eventSaga = SAGA_FOR_EVENT[event.eventType];
    if (!eventSaga) {
      console.warn(`No handler for eventType (${event.eventType}), skipping forward`);
      continue;
    }

    yield call(eventSaga, uuid);
  };
}
