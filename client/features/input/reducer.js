const MOVE_WEST      = { type: "MOVE_PLAYER", payload: { dx: -1, dy: +0 }}; 
const MOVE_SOUTH     = { type: "MOVE_PLAYER", payload: { dx: +0, dy: +1 }};
const MOVE_NORTH     = { type: "MOVE_PLAYER", payload: { dx: +0, dy: -1 }};
const MOVE_EAST      = { type: "MOVE_PLAYER", payload: { dx: +1, dy: +0 }};
const MOVE_NORTHWEST = { type: "MOVE_PLAYER", payload: { dx: -1, dy: -1 }};
const MOVE_NORTHEAST = { type: "MOVE_PLAYER", payload: { dx: +1, dy: -1 }};
const MOVE_SOUTHWEST = { type: "MOVE_PLAYER", payload: { dx: -1, dy: +1 }};
const MOVE_SOUTHEAST = { type: "MOVE_PLAYER", payload: { dx: +1, dy: +1 }};

const initialState = {
  keymap: {
    "KeyH": MOVE_WEST,
    "KeyJ": MOVE_SOUTH,
    "KeyK": MOVE_NORTH,
    "KeyL": MOVE_EAST,
    "KeyY": MOVE_NORTHWEST,
    "KeyU": MOVE_NORTHEAST,
    "KeyB": MOVE_SOUTHWEST,
    "KeyN": MOVE_SOUTHEAST,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
