import type { AppState } from "root-reducer";

const initialState = {
  showBrain:  null,
  isCameraFrozen: false,
  ready:      false,
  message:    null,
  midpoint:   { x: 0, y: 0 },
  screenSize: { x: 0, y: 0 },
  offset:     { x: 0, y: 0 }
};

export const backgroundTiles = function* (state: AppState) {
  const currentMapUuid = state.maps.currentMap;
  const { background, dimensions } = state.maps.maps[currentMapUuid];
  const { x: ssx, y: ssy } = state.rendering.screenSize;
  const { x: sx, y: sy } = dimensions;
  const { x: dx, y: dy } = state.rendering.offset;

  const x0 = -dx < 0 ? 0 : -dx;
  const y0 = -dy < 0 ? 0 : -dy;
  const x1 = sx - dx >= ssx ? ssx : sx - dx;
  const y1 = sy - dy >= ssy ? ssy : sy - dy;

  for (let x = x0; x < x1; x++) {
    for (let y = y0; y < y1; y++) {
      yield { x, y, tileName: background };
    }
  }
};
export const getScreenSizePx = (state: AppState) => state.rendering.screenSizePx;
export const getTileSizePx = (state: AppState) => state.rendering.tileSizePx;
export const getScreenSize = (state: AppState) => state.rendering.screenSize;
export const shouldRender = (state: AppState) => state.rendering.ready;
export const getMessage = (state) => state.rendering.message;
export const getOffset = (state) => state.rendering.offset;
export const getMidpoint = (state) => state.rendering.midpoint;
export const getCameraFrozen = (state) => state.rendering.isCameraFrozen;

export const getTileForPixel = (state, px, py) => {
  const { x: tsx, y: tsy } = getTileSizePx(state);
  return {
    x: Math.floor(px / tsx), 
    y: Math.floor(py / tsy)
  };
};

export const centerViewport = (x, y) => ({
  type:    "CENTER_VIEWPORT",
  payload: {
    x, y
  }
});

export const setCameraFrozen = (isCameraFrozen) => ({
  type:    "SET_CAMERA_FROZEN",
  payload: {
    isCameraFrozen
  }
});

export const setScreenMessage = (message) => ({
  type:    "SET_SCREEN_MESSAGE",
  payload: {
    message
  }
});

/* eslint complexity: ["warn"] max-statements: ["warn"] */
export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_BRAIN": {
      const { uuid } = action.payload;
      return {
        ...state,
        showBrain: uuid
      }
    }
    case "SET_CAMERA_FROZEN": {
      const { isCameraFrozen } = action.payload;
      return {
        ...state,
        isCameraFrozen
      };
    }
    case "INIT_SCREEN_SIZE": {
      const {
        screenSizePx: {
          x: psx,
          y: psy
        },
        tileSizePx: {
          x: tsx,
          y: tsy
        }
      } = action.payload;
      const [sx, sy] = [Math.ceil(psx / tsx), Math.ceil(psy / tsy)];
      // eslint-disable-next-line no-magic-numbers
      const [mx, my] = [Math.floor(sx / 2), Math.floor(sy / 2)];
      return {
        ...state,
        screenSize: {
          x: sx,
          y: sy
        },
        midpoint: {
          x: mx,
          y: my
        },
        screenSizePx: {
          x: psx,
          y: psy
        },
        tileSizePx: {
          x: tsx,
          y: tsy
        }
      };
    }
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
    case "MOVE_ENTITY": {
      if (!state.isCameraFrozen && action.payload.cameraTracking) {
        const { dx = 0, dy = 0 } = action.payload;
        const { x: x0 = 0, y: y0 = 0 } = state.offset;
        return {
          ...state,
          offset: {
            x: x0 + dx,
            y: y0 + dy
          }
        };
      } else {
        return state;
      }
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
    case "SPAWN_ENTITY": {
      const { player, position } = action.payload;
      if (player && position) {
        const { x: cx, y: cy } = position;
        const { x: mx, y: my } = state.midpoint;
        return {
          ...state,
          offset: {
            x: cx - mx,
            y: cy - my
          }
        };
      } else {
        return state;
      }
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
