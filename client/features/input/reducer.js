import { move } from "features/movement/actions";

const initialState = {
  keymap: {
    'KeyH': move('west'),
    'KeyJ': move('south'),
    'KeyK': move('north'),
    'KeyL': move('east'),

    'KeyY': move('northwest'),
    'KeyU': move('northeast'),
    'KeyB': move('southwest'),
    'KeyN': move('southeast'),
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
