import { map } from 'lodash';
import testMap from "res/test.map";

const initialState = {};

export const getPositions = (state) => map(state.maps, (pos, uuid) => [uuid, pos]);

export default (state = initialState, { type, payload }, playerUuid) => {
  switch (type) {
    case "MOVE_PLAYER": {
      const { dx, dy } = payload;
      const entity = state[playerUuid];
      if(entity) {
        const { x: x0, y: y0 } = entity;
        return {
          ...state,
          [playerUuid]: {
            x: x0 + dx,
            y: y0 + dy,
          }
        }
      } else {
        return state;
      }
    }
    case "MOVE_ENTITY": {
      const { uuid, dx, dy } = payload;
      const entity = state.entityRegistry[uuid];
      if(entity) {
        const { x: x0, y: y0 } = entity;
        return {
          ...state,
          [uuid]: {
            x: x0 + dx,
            y: y0 + dy,
          }
        }
      } else {
        return state;
      }
    }
    case "SPAWN_ENTITY": {
      const { uuid, position } = payload;
      if(position) {
        return {
          ...state,
          [uuid]: position
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
