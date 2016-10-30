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
