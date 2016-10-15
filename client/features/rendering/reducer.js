import type { AppState } from "root-reducer";

const initialState = {
  ready:    false,
  message:  null,
  midpoint: {
    x: 4,
    y: 4
  },
  screenSize: {
    x: 9,
    y: 9
  },
  offset: {
    x: 0,
    y: 0
  }
};

export const shouldRender = (state: AppState) => state.rendering.ready;
export const getMessage = (state) => state.rendering.message;
export const getOffset = (state) => state.rendering.offset;
export const getMidpoint = (state) => state.rendering.midpoint;

export default (state = initialState, action) => {
  switch (action.type) {
    case "START_RENDERING": {
      return {
        ...state,
        ready: true
      };
    }
    case "SET_SCREEN_MESSAGE": {
      const { message } = action.payload;
      return {
        ...state,
        message
      };
    }
    case "CLEAR_MESSAGE": {
      return {
        ...state,
        message: null
      };
    }
    case "ADJUST_VIEWPORT": {
      const { dx = 0, dy = 0 } = action.payload;
      const { x: x0 = 0, y: y0 = 0 } = state.offset;
      return {
        ...state,
        offset: {
          x: x0 + dx,
          y: y0 + dy
        }
      };
    }
    case "CENTER_VIEWPORT": {
      const { x: cx = 0, y: cy = 0 } = action.payload;
      const { x: mx, y: my } = state.midpoint;

      return {
        ...state,
        offset: {
          x: cx - mx,
          y: cy - my
        }
      };
    }
    default: {
      return state;
    }
  }
};
