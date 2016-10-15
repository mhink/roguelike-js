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

export default combineReducers({
  input,
  tilesets,
  maps,
  player,
  rendering
});
