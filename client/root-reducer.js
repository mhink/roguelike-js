import { combineReducers } from "redux";
import input from "features/input/reducer";
import tilesets from "features/tilesets/reducer";
import maps from "features/maps/reducer";
import player from "features/player/reducer";

export default function(state, action) {
  return {
    input:    input(state.input, action),
    tilesets: tilesets(state.tilesets, action),
    maps:     maps(state.maps, action, (state.player && state.player.playerUuid)),
    player:   player(state.player, action),
  }
};
