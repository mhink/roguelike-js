// @flow

import { map } from "lodash";
import testMap from "res/test.map";
import type { AppState, Action } from "root-reducer";

export type MapsState = {
  registry: {
    [key: string]: {
      x: number,
      y: number
    }
  }
};

const initialState : MapsState = {
  registry: {}
};

export const getPlayerPosition = (state : AppState) => state.maps.registry[state.player.playerUuid];
export const getPositions = (state : AppState) => map(state.maps.registry, (pos, uuid) => [uuid, pos]);

export default (state : MapsState = initialState,  action : Action, playerUuid : string) : MapsState => {
  switch (action.type) {
    case "MOVE_PLAYER": {
      const { dx, dy } = action.payload;
      const entity = state.registry[playerUuid];
      if(entity) {
        const { x: x0, y: y0 } = entity;
        return {
          ...state,
          registry: {
            ...state.registry,
            [playerUuid]: {
              x: x0 + dx,
              y: y0 + dy,
            }
          }
        }
      } else {
        return state;
      }
    }
    case "SPAWN_ENTITY": {
      const { uuid, position } = action.payload;
      if(position) {
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
