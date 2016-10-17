const initialState = {
  time:         0,
  currentEvent: null,
  eventQueue:   [
    {t: 15, eventType: "SAY_HELLO"},
    {t: 20, eventType: "SAY_HELLO_AGAIN"},
    {t: 50, eventType: "SAY_HELLO_FINAL"},
  ]
};

export const runClock = (minTime) => ({
  type: "RUN_CLOCK",
  payload: {
    minTime
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case "RUN_CLOCK": {
      const { minTime = 10 } = action.payload;
      const candidateEvent = state.eventQueue[0];

      if (candidateEvent && candidateEvent.t <= state.time + minTime) {
        return {
          ...state,
          time: candidateEvent.t,
          currentEvent: candidateEvent,
          eventQueue: state.eventQueue.slice(1)
        };
      } else {
        return {
          ...state,
          time: state.time + minTime,
          currentEvent: null,
        };
      }
    }
    default: {
      return state;
    }
  }
};
