export const updateEntity = (state, uuid, newComponent) => ({
  ...state,
  registry: {
    ...state.registry,
    [uuid]: {
      ...state.registry[uuid],
      ...newComponent
    }
  }
});

export default (componentKey, reducer) => (state, action) => {
  switch(action.type) {
    case "SPAWN_ENTITY": {
      const { uuid } = action.payload; 
      const component = action.payload[componentKey];
      if (component) {
        const nextState = {
          ...state,
          registry: {
            ...state.registry,
            [uuid]: component
          }
        }
        return reducer(nextState, action);
      } else {
        return state;
      }
    }
    case "REAP_ENTITY": {
      const { uuid } = action.payload;
      const nextRegistry = state.registry;
      delete nextRegistry[uuid];
      const nextState = {
        ...state,
        registry: nextRegistry
      }
      return reducer(nextState, action);
    }
    default: {
      if (!state || !state.registry) {
        const nextState = reducer(state, action);
        return {
          registry: {},
          ...nextState
        }
      } else {
        return reducer(state, action);
      }
    }
  }
};
