import { combineReducers } from "redux";
import input from "features/input/reducer";
import tilesets from "features/tilesets/reducer";
import maps from "features/maps/reducer";

export default combineReducers({
  input,
  tilesets,
  maps,
});
