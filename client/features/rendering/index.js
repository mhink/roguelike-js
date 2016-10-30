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

export * from "./selectors";
export * from "./actions";

const SET_CAMERA_FROZEN   = "SET_CAMERA_FROZEN";
const INIT_SCREEN_SIZE    = "INIT_SCREEN_SIZE";
const START_RENDERING     = "START_RENDERING";
const SET_SCREEN_MESSAGE  = "SET_SCREEN_MESSAGE";
const CLEAR_MESSAGE       = "CLEAR_MESSAGE";
const MOVE_ENTITY         = "MOVE_ENTITY";
const ADJUST_VIEWPORT     = "ADJUST_VIEWPORT";
const SPAWN_ENTITY        = "SPAWN_ENTITY";
const CENTER_VIEWPORT     = "CENTER_VIEWPORT";

const ACTION_HANDLERS = {
  [SET_CAMERA_FROZEN]:  (state, { isCameraFrozen }) => ({
    ...state,
    isCameraFrozen
  }),
  [START_RENDERING]: (state) => ({
    ...state,
    ready: true
  }),
  [SET_SCREEN_MESSAGE]: (state, { message }) => ({
    ...state,
    message
  }),
  [CLEAR_MESSAGE]: (state) => ({
    ...state,
    message: null,
  }),
  [MOVE_ENTITY]: (state, { dx = 0, dy = 0, cameraTracking = false }) => (
    (state.isCameraFrozen || !cameraTracking)
      ? state
      : {
        ...state,
        offset: {
          x: state.offset.x + dx,
          y: state.offset.y + dy
        }
      }
  ),
  [ADJUST_VIEWPORT]: (state, { dx = 0, dy = 0 }) => ({
    ...state,
    offset: {
      x: state.offset.x + dx,
      y: state.offset.y + dy
    }
  }),
  [SPAWN_ENTITY]: (state, { player, position }) => (
    (!player || !position) 
      ? state
      : {
        ...state,
        offset: {
          x: position.x - state.midpoint.x,
          y: position.y - state.midpoint.y,
        }
      }
  ),
  [CENTER_VIEWPORT]: (state, { x: cx = 0, y: cy = 0}) => ({
    ...state,
    offset: {
      x: cx - state.midpoint.x,
      y: cy - state.midpoint.y
    }
  }),

  [INIT_SCREEN_SIZE]: (state, payload) => {
    const {
      screenSizePx: { x: psx, y: psy },
      tileSizePx:   { x: tsx, y: tsy }
    } = payload;

    const { ceil, floor } = Math;
    const [sx, sy] = [ceil(psx / tsx), ceil(psy / tsy)];
    return {
      ...state,
      screenSize:   { x: sx, y: sy },
      midpoint:     { x: floor(sx/2), y: floor(sy/2)}, // eslint-disable-line no-magic-numbers
      screenSizePx: { x: psx, y: psy },
      tileSizePx:   { x: tsx, y: tsy }
    };
  },
};

/* eslint complexity: ["warn"] max-statements: ["warn"] */
export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action.payload) : state;
};
