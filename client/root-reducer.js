// @flow

import { combineReducers } from "redux";
import input from "features/input";
import tilesets from "features/tilesets";
import maps from "features/maps";
import player from "features/player";
import rendering from "features/rendering";

import type { TilesetsState } from "features/tilesets";
import type { MapsState } from "features/maps";

export type AppState = {
  input: Object,
  tilesets: TilesetsState,
  maps: MapsState,
  player: Object,
  rendering: Object,
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
  rendering,
});
