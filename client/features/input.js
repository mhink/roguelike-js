const MOVE_CAMERA_WEST = { command: "MOVE_CAMERA", payload: { dx: -1, dy: +0 } };
const MOVE_CAMERA_SOUTH = { command: "MOVE_CAMERA", payload: { dx: +0, dy: +1 } };
const MOVE_CAMERA_NORTH = { command: "MOVE_CAMERA", payload: { dx: +0, dy: -1 } };
const MOVE_CAMERA_EAST = { command: "MOVE_CAMERA", payload: { dx: +1, dy: +0 } };
const MOVE_CAMERA_NORTHWEST = { command: "MOVE_CAMERA", payload: { dx: -1, dy: -1 } };
const MOVE_CAMERA_NORTHEAST = { command: "MOVE_CAMERA", payload: { dx: +1, dy: -1 } };
const MOVE_CAMERA_SOUTHWEST = { command: "MOVE_CAMERA", payload: { dx: -1, dy: +1 } };
const MOVE_CAMERA_SOUTHEAST = { command: "MOVE_CAMERA", payload: { dx: +1, dy: +1 } };

const MOVE_WEST = { command: "MOVE_PLAYER", payload: { dx: -1, dy: +0 } };
const MOVE_SOUTH = { command: "MOVE_PLAYER", payload: { dx: +0, dy: +1 } };
const MOVE_NORTH = { command: "MOVE_PLAYER", payload: { dx: +0, dy: -1 } };
const MOVE_EAST = { command: "MOVE_PLAYER", payload: { dx: +1, dy: +0 } };
const MOVE_NORTHWEST = { command: "MOVE_PLAYER", payload: { dx: -1, dy: -1 } };
const MOVE_NORTHEAST = { command: "MOVE_PLAYER", payload: { dx: +1, dy: -1 } };
const MOVE_SOUTHWEST = { command: "MOVE_PLAYER", payload: { dx: -1, dy: +1 } };
const MOVE_SOUTHEAST = { command: "MOVE_PLAYER", payload: { dx: +1, dy: +1 } };

const SET_INPUT_MODE_INSPECT = { command: "SET_INPUT_MODE", payload: { mode: "inspect" } };
const SET_INPUT_MODE_NORMAL = { command: "SET_INPUT_MODE", payload: { mode: "normal" } };

const QUIT_GAME = { command: "QUIT_GAME" };

const DEBUG_IPC = { command: "DEBUG_IPC" };

const TOGGLE_CAMERA_FREEZE = { command: "TOGGLE_CAMERA_FREEZE" };

const RUN_SIMULATOR = { command: "RUN_SIMULATOR" };

export const commandForKeySelector = (state, key) => {
  switch (state.input.mode) {
    case "inspect": {
      return state.input.inspectModeKeymap[key];
    }
    case "normal":
    default: {
      return state.input.normalModeKeymap[key];
    }
  }
};

const initialState = {
  mode:             "normal",
  normalModeKeymap: {
    "KeyQ": QUIT_GAME,
    "KeyH": MOVE_WEST,
    "KeyJ": MOVE_SOUTH,
    "KeyK": MOVE_NORTH,
    "KeyL": MOVE_EAST,
    "KeyY": MOVE_NORTHWEST,
    "KeyU": MOVE_NORTHEAST,
    "KeyB": MOVE_SOUTHWEST,
    "KeyN": MOVE_SOUTHEAST,

    "KeyA": SET_INPUT_MODE_INSPECT,
    "KeyS": RUN_SIMULATOR,
    "KeyD": DEBUG_IPC,
    "KeyF": TOGGLE_CAMERA_FREEZE
  },
  inspectModeKeymap: {
    "KeyA": SET_INPUT_MODE_NORMAL,
    "KeyH": MOVE_CAMERA_WEST,
    "KeyJ": MOVE_CAMERA_SOUTH,
    "KeyK": MOVE_CAMERA_NORTH,
    "KeyL": MOVE_CAMERA_EAST,
    "KeyY": MOVE_CAMERA_NORTHWEST,
    "KeyU": MOVE_CAMERA_NORTHEAST,
    "KeyB": MOVE_CAMERA_SOUTHWEST,
    "KeyN": MOVE_CAMERA_SOUTHEAST
  }
};

export const setInputMode = (mode) => ({
  type:    "SET_INPUT_MODE",
  payload: {
    mode
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUT_MODE": {
      const { mode } = action.payload;
      return {
        ...state,
        mode
      };
    }
    default: {
      return state;
    }
  }
};
