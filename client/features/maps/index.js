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

const ACTION_HANDLERS = {
  "CREATE_MAP": (state, { uuid, background, dimensions }) => ({
    ...state,
    currentMap: (state.currentMap || uuid),
    maps: {
      ...state.maps,
      [uuid]: { background, dimensions }
    }
  }),
  "MOVE_ENTITY": (state, { uuid, dx, dy }) => {
    if(!state.registry[uuid]) return state;

    const entity = state.registry[uuid];
    
    return updateEntity(state, uuid, {
      x: entity.x + dx,
      y: entity.y + dy
    });
  },
  "SPAWN_ENTITY": (state, { uuid, position }) => (
    position.mapUuid
      ? state
      : updateEntity(state, uuid, { mapUuid: state.currentMap })
  ),
};

/* eslint complexity: ["warn"] max-statements: ["warn"] */
export default entityReducer("position", (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
});
