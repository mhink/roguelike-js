import { findIndex } from "lodash";

const initialState = {
  currentTime:  0,
  eventQueue:   [],
  registry:     {}
};

export const getSimulationComponent = (state, uuid) => state.simulator.registry[uuid];
export const getCurrentEvent = (state) => state.simulator.eventQueue[0];
export const runClock = () => ({ type: "RUN_CLOCK" });

export default (state = initialState, action) => {
  switch (action.type) {
    case "SPAWN_ENTITY": {
      const { uuid, actor } = action.payload;

      // GUARD CLAUSE
      if (!actor) return state;

      const { currentTime, eventQueue } = state;
      const { eventType, speed, repeat } = actor;
      const newEvent = {
        uuid,
        t: (currentTime + speed)
      };

      let eventIx = findIndex(eventQueue, (event) => {
        return event.t > newEvent.t
      });

      if(eventIx === -1) {
        eventIx = eventQueue.length;
      }

      const eqHead = eventQueue.slice(0, eventIx);
      const eqTail = eventQueue.slice(eventIx);
      const nextEventQueue = [
        ...eqHead,
        newEvent,
        ...eqTail
      ];

      return {
        ...state,
        currentTime: nextEventQueue[0].t,
        eventQueue: nextEventQueue,
        registry: {
          ...state.registry,
          [uuid]: {
            eventType,
            speed,
            repeat
          }
        }
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

      const { repeat, speed, eventType } = registry[uuid];

      if (repeat) {
        // re-enqueue the event
        const newEvent = {
          uuid, // same uuid
          t: (currentTime + speed)
        };

        // where should we put it?
        let eventIx = findIndex(nextEventQueue, (event) => {
          return event.t > newEvent.t
        });

        // if we never found an event with a higher time,
        // stick it at the end
        if(eventIx === -1) {
          eventIx = nextEventQueue.length;
        }

        // splice it in
        const eqHead = nextEventQueue.slice(0, eventIx);
        const eqTail = nextEventQueue.slice(eventIx);
        nextEventQueue = [
          ...eqHead,
          newEvent,
          ...eqTail
        ];
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
};
