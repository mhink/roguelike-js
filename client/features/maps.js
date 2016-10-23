// @flow
/* eslint max-len: [ "error", 105 ] no-shadow: ["error", { "allow": ["uuid"]}]*/

import entityReducer, {
  updateEntity
} from "util/entity-reducer";
import { findKey, map } from "lodash";
import { v4 as uuid } from "uuid";

const initialState = {
  currentMap: null,
  maps:       {},
  registry:   {}
};

export const entityCanMoveTo = (state, uuid, { dx, dy }) => {
  const { mapUuid, x: x0, y: y0 } = state.maps.registry[uuid];
  const { dimensions: { x: sx, y: sy } } = state.maps.maps[mapUuid];
  const [x, y] = [x0 + dx, y0 + dy];
  if (x < 0 || x >= sx || y < 0 || y >= sy) {
    return false;
  } else if (getEntityAtPosition(state, x, y, mapUuid)) {
    return false;
  } else { 
    return true;
  }

};

export const getCurrentMap = (state) => state.maps.currentMap;
export const getCurrentMapDimensions = (state) => {
  const currentMap = state.maps.maps[state.maps.currentMap];
  return currentMap && currentMap.dimensions;
};

export const getPlayerPosition = (state) => state.maps.registry[state.player.playerUuid];
export const getPositions = (state) => map(state.maps.registry, (pos, uuid) => [uuid, pos]);
export const getPositionForEntity = (state, uuid) => state.maps.registry[uuid];

// TODO: make this more efficient!
export const getEntityAtPosition = (state, x, y, mapUuid) => {
  return findKey(state.maps.registry, (pos, uuid) => {
    return (
        pos.mapUuid === mapUuid
    &&  pos.x === x
    &&  pos.y === y
    );
  })
};

export const createMap = (background, x, y) => ({
  type:    "CREATE_MAP",
  payload: {
    uuid:       uuid(),
    background,
    dimensions: {
      x, y
    }
  }
});

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
