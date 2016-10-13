// @flow

import { combineReducers } from "redux";
import input from "features/input/reducer";
import tilesets from "features/tilesets/reducer";
import maps from "features/maps/reducer";
import player from "features/player/reducer";
import rendering from "features/rendering/reducer";

import type { TilesetsState } from "features/tilesets/reducer";
import type { MapsState } from "features/maps/reducer";

export type AppState = {
  input:      Object,
  tilesets:   TilesetsState,
  maps:       MapsState,
  player:     Object,
  rendering:  Object,
};

export type Action = {
  type: string,
  payload: Object,
};

export default function(state : AppState, action : Action) {
  return {
    input:      input(state.input, action),
    tilesets:   tilesets(state.tilesets, action),
    maps:       maps(state.maps, action, (state.player && state.player.playerUuid)),
    player:     player(state.player, action),
    rendering:  rendering(state.rendering, action),
  }
};
