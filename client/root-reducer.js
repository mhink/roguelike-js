import { combineReducers } from "redux";
import input from "features/input/reducer";
import tilesets from "features/tilesets/reducer";

export default combineReducers({
  input,
  tilesets
});
