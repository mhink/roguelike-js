// @flow

import { map } from "lodash";
import type { AppState, Action } from "root-reducer";

type uuid = string;

type EntityPosition = {
  mapUuid: uuid,
};

type Map = {
  background: string,
  dimensions: {
    x: number,
    y: number,
  }
};

export type MapsState = {
  currentMap: ?uuid,
  maps: {
    [key: uuid]: Map
  },
  registry: {
    [key: uuid]: {
      mapUuid: uuid,
      x: number,
      y: number
    }
  }
};

const initialState : MapsState = {
  currentMap: null,
  maps: {},
  registry: {}
};

export const getPlayerPosition = (state : AppState) => state.maps.registry[state.player.playerUuid];
export const getPositions = (state : AppState) => map(state.maps.registry, (pos, uuid) => [uuid, pos]);

export default (state : MapsState = initialState,  action : Action) : MapsState => {
  switch (action.type) {
    case "MOVE_ENTITY": {
      const { uuid, dx, dy } = action.payload;
      const entity = state.registry[uuid];
      if(entity) {
        const { x: x0, y: y0 } = entity;
        return {
          ...state,
          registry: {
            ...state.registry,
            [uuid]: {
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
