import { combineReducers } from "redux";
import input from "features/input/reducer";
import tilesets from "features/tilesets/reducer";
import display from "features/display/reducer";

export default combineReducers({
  input,
  tilesets,
  display,
});
