import { select, call, put } from 'redux-saga/effects';

import { 
  runClock, 
  getCurrentEvent,
  getSimulationComponent
} from "features/simulator";

import goblinAi from "./goblin-ai";

const SAGA_FOR_EVENT = {
  GOBLIN_AI: goblinAi
}

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

    const handlerSaga = SAGA_FOR_EVENT[event.eventType];
    if (!handlerSaga) {
      console.warn(`No handler for eventType (${event.eventType}), skipping forward`);
      continue;
    }

    yield call(handlerSaga, uuid);
  };
}
