// @flow

import { combineReducers } from "redux";
import input from "features/input";
import tilesets from "features/tilesets";
import maps from "features/maps";
import player from "features/player";
import rendering from "features/rendering";
import simulator from "features/simulator";
import combat from "features/combat";
import disposition from "features/disposition";
import appearance from "features/appearance";

import type { TilesetsState } from "features/tilesets";
import type { MapsState } from "features/maps";

export type AppState = {
  input: Object,
  tilesets: TilesetsState,
  maps: MapsState,
  player: Object,
  rendering: Object,
  simulator: Object,
  combat: Object,
  ai: Object,
  appearance: Object
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
  simulator,
  combat,
  disposition,
  appearance
});
