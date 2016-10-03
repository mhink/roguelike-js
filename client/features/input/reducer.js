import { move } from "features/movement/actions";

const initialState = {
  keymap: {
    'KeyH': 'MOVE_WEST',
    'KeyJ': 'MOVE_SOUTH',
    'KeyK': 'MOVE_NORTH',
    'KeyL': 'MOVE_EAST',
    'KeyY': 'MOVE_NORTHWEST',
    'KeyU': 'MOVE_NORTHEAST',
    'KeyB': 'MOVE_SOUTHWEST',
    'KeyN': 'MOVE_SOUTHEAST',
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
