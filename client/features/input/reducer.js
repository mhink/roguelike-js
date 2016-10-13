const MOVE_CAMERA_WEST      = { type: "MOVE_CAMERA", payload: { dx: -1, dy: +0 }}; 
const MOVE_CAMERA_SOUTH     = { type: "MOVE_CAMERA", payload: { dx: +0, dy: +1 }};
const MOVE_CAMERA_NORTH     = { type: "MOVE_CAMERA", payload: { dx: +0, dy: -1 }};
const MOVE_CAMERA_EAST      = { type: "MOVE_CAMERA", payload: { dx: +1, dy: +0 }};
const MOVE_CAMERA_NORTHWEST = { type: "MOVE_CAMERA", payload: { dx: -1, dy: -1 }};
const MOVE_CAMERA_NORTHEAST = { type: "MOVE_CAMERA", payload: { dx: +1, dy: -1 }};
const MOVE_CAMERA_SOUTHWEST = { type: "MOVE_CAMERA", payload: { dx: -1, dy: +1 }};
const MOVE_CAMERA_SOUTHEAST = { type: "MOVE_CAMERA", payload: { dx: +1, dy: +1 }};

const MOVE_WEST      = { type: "MOVE_PLAYER", payload: { dx: -1, dy: +0 }}; 
const MOVE_SOUTH     = { type: "MOVE_PLAYER", payload: { dx: +0, dy: +1 }};
const MOVE_NORTH     = { type: "MOVE_PLAYER", payload: { dx: +0, dy: -1 }};
const MOVE_EAST      = { type: "MOVE_PLAYER", payload: { dx: +1, dy: +0 }};
const MOVE_NORTHWEST = { type: "MOVE_PLAYER", payload: { dx: -1, dy: -1 }};
const MOVE_NORTHEAST = { type: "MOVE_PLAYER", payload: { dx: +1, dy: -1 }};
const MOVE_SOUTHWEST = { type: "MOVE_PLAYER", payload: { dx: -1, dy: +1 }};
const MOVE_SOUTHEAST = { type: "MOVE_PLAYER", payload: { dx: +1, dy: +1 }};

const setMoveMode = (moveMode) => ({ type: "SET_MOVE_MODE", payload: { moveMode }});

const QUIT_GAME = { type: "IPC_REQUEST", payload: { command: "QUIT" } };

export const actionForKeySelector = (state, key) => {
  switch(state.input.moveMode) {
    case "camera": {
      return state.input.cameraModeKeymap[key];
    }
    case "player": 
    default: {
      return state.input.playerModeKeymap[key];
    }
  }
}

const initialState = {
  moveMode: "player",
  playerModeKeymap: {
    "KeyA": setMoveMode("camera"),
    "KeyQ": QUIT_GAME,
    "KeyH": MOVE_WEST,
    "KeyJ": MOVE_SOUTH,
    "KeyK": MOVE_NORTH,
    "KeyL": MOVE_EAST,
    "KeyY": MOVE_NORTHWEST,
    "KeyU": MOVE_NORTHEAST,
    "KeyB": MOVE_SOUTHWEST,
    "KeyN": MOVE_SOUTHEAST,
  },
  cameraModeKeymap: {
    "KeyA": setMoveMode("player"),
    "KeyH": MOVE_CAMERA_WEST,
    "KeyJ": MOVE_CAMERA_SOUTH,
    "KeyK": MOVE_CAMERA_NORTH,
    "KeyL": MOVE_CAMERA_EAST,
    "KeyY": MOVE_CAMERA_NORTHWEST,
    "KeyU": MOVE_CAMERA_NORTHEAST,
    "KeyB": MOVE_CAMERA_SOUTHWEST,
    "KeyN": MOVE_CAMERA_SOUTHEAST,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVE_MODE": {
      const { moveMode } = action.payload;
      return {
        ...state,
        moveMode,
      };
    }
    default: {
      return state;
    }
  }
};
