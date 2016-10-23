// @flow
/* eslint max-len: [ "error", 105 ] no-shadow: ["error", { "allow": ["uuid"]}]*/

import entityReducer, {
  updateEntity
} from "util/entity-reducer";

export * from "./selectors";
export * from "./actions";

const initialState = {
  currentMap: null,
  maps:       {},
  registry:   {}
};

/* eslint complexity: ["warn"] max-statements: ["warn"] */
export default entityReducer("position", (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_MAP": {
      const { uuid, background, dimensions } = action.payload;
      return {
        ...state,
        currentMap: state.currentMap || uuid,
        maps:       {
          ...state.maps,
          [uuid]: {
            background, dimensions
          }
        }
      };
    }
    case "MOVE_ENTITY": {
      const { uuid, dx, dy } = action.payload;
      const entity = state.registry[uuid];
      if (entity) {
        const { x: x0, y: y0 } = entity;
        return updateEntity(state, uuid, {
          x: x0 + dx,
          y: y0 + dy
        });
      } else {
        return state;
      }
    }
    case "SPAWN_ENTITY": {
      const { uuid, position } = action.payload;
      return (position.mapUuid
        ? state
        : updateEntity(state, uuid, { mapUuid: state.currentMap }));
    }
    default: {
      return state;
    }
  }
});
