// @flow
/* eslint max-len: [ "error", 105 ] no-shadow: ["error", { "allow": ["uuid"]}]*/

import { map } from "lodash";

const initialState = {
  currentMap: null,
  maps:       {},
  registry:   {}
};

export const entityCanMoveTo = (state, uuid, { dx, dy }) => {
  const { mapUuid, x: x0, y: y0 } = state.maps.registry[uuid];
  const { dimensions: { x: sx, y: sy } } = state.maps.maps[mapUuid];
  const [x, y] = [x0 + dx, y0 + dy];
  if (x < 0 || x >= sx || y < 0 || y >= sy ) {
    return false;
  } else {
    return true;
  }
};

export const getCurrentMapDimensions = (state) => {
  const currentMap = state.maps.maps[state.maps.currentMap];
  return currentMap && currentMap.dimensions;
};

export const getPlayerPosition = (state) => state.maps.registry[state.player.playerUuid];
export const getPositions = (state) => map(state.maps.registry, (pos, uuid) => [uuid, pos]);

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_MAP": {
      const { uuid, background, dimensions } = action.payload;
      return {
        ...state,
        currentMap: (state.currentMap || uuid),
        maps: {
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
        return {
          ...state,
          registry: {
            ...state.registry,
            [uuid]: {
              ...entity,
              x: x0 + dx,
              y: y0 + dy
            }
          }
        };
      } else {
        return state;
      }
    }
    case "SPAWN_ENTITY": {
      const { uuid, position } = action.payload;
      if (position) {
        if(!position.mapUuid) {
          position.mapUuid = state.currentMap;
        }
        return {
          ...state,
          registry: {
            ...state.registry,
            [uuid]: position
          }
        };
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};
