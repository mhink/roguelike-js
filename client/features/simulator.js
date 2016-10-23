import { reject, findIndex } from "lodash";
import entityReducer from "util/entity-reducer";

const initialState = {
  currentTime:  0,
  eventQueue:   [],
  registry:     {}
};

export const getCurrentTime = (state) => state.simulator.currentTime;
export const getSimulationComponent = (state, uuid) => state.simulator.registry[uuid];
export const getCurrentEvent = (state) => state.simulator.eventQueue[0];
export const runClock = () => ({ type: "RUN_CLOCK" });

const enqueueEvent = (eventQueue, newEvent) => {
  let eventIx = findIndex(eventQueue, (event) => {
    return event.t > newEvent.t
  });

  if(eventIx === -1) {
    eventIx = eventQueue.length;
  }

  const eqHead = eventQueue.slice(0, eventIx);
  const eqTail = eventQueue.slice(eventIx);
  return [
    ...eqHead,
    newEvent,
    ...eqTail
  ];
};

export default entityReducer("actor", (state = initialState, action) => {
  switch (action.type) {
    case "REAP_ENTITY": {
      const { uuid } = action.payload;
      const nextEventQueue = reject(state.eventQueue, (event) => {
        event.uuid === uuid
      });
      return {
        ...state,
        eventQueue: nextEventQueue,
      }
    }

    case "SPAWN_ENTITY": {
      const { uuid, actor } = action.payload;

      // GUARD CLAUSE
      if (!actor) return state;

      const nextEventQueue = enqueueEvent(
        state.eventQueue,
        { uuid, t: (state.currentTime + actor.speed) }
      );

      return {
        ...state,
        currentTime: nextEventQueue[0].t,
        eventQueue: nextEventQueue,
      };
    }
    case "RUN_CLOCK": {
      // when this action is reduced, we expect that the event
      // in eventQueue[0] has _already_ been processed. We call
      // this the "old" event.

      const { currentTime, eventQueue, registry } = state;
      if (eventQueue.length === 0) return state;

      // uuid of the old event
      const { uuid } = eventQueue[0];

      // slice the old event out of the queue
      let nextEventQueue = eventQueue.slice(1);
      let nextRegistry = { ...registry };

      if(!registry[uuid]) {
        return {
          ...state,
          eventQueue: nextEventQueue,
          registry: nextRegistry
        };
      }

      const { repeat, speed } = registry[uuid];

      if (repeat) {
        // re-enqueue the event
        nextEventQueue = enqueueEvent(
          nextEventQueue,
          { uuid, t: (currentTime + speed) }
        );
      } else {
        delete nextRegistry[uuid];
      }

      let nextCurrentTime;
      if (nextEventQueue[0]) {
        nextCurrentTime = nextEventQueue[0].t;
      } else {
        nextCurrentTime = currentTime;
      }

      return {
        ...state,
        currentTime: nextCurrentTime,
        eventQueue: nextEventQueue,
        registry: nextRegistry,
      };
    }
    default: {
      return state;
    }
  }
});
