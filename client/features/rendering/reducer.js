const initialState = {
  message: null,
  screenSize: {
    x: 9,
    y: 9
  },
  offset: {
    x: 0,
    y: 0
  }
}

export const getMessage = (state) => state.rendering.message;
export const getOffset = (state) => state.rendering.offset;

export default (state = initialState, action) => {
  switch(action.type) {
    case "SET_MOVE_MODE": {
      const { moveMode } = action.payload;
      return {
        ...state,
        message: `Move mode set to ${moveMode}`
      };
    }
    case "RESET_OFFSET": {
      const { x: x0, y: y0 } = action.payload;
      const { x: sx, y: sy } = state.screenSize;
      const [cx, cy] = [Math.floor(sx / 2), Math.floor(sy / 2)];
      const [ x1, y1 ] = [-(cx + x0), -(cy + y0)];

      return {
        ...state,
        offset: {
          x: x1 || 0,
          y: y1 || 0,
        }
      };
    }
    case "MOVE_CAMERA":
    case "MOVE_PLAYER": {
      const { dx, dy } = action.payload;
      const { x: x0, y: y0 } = state.offset;
      return {
        ...state,
        message: null,
        offset: {
          x: x0 + dx,
          y: y0 + dy,
        }
      };
    }
    default: {
      return state;
    }
  }
}
