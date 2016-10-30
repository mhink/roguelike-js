import { eventChannel } from "redux-saga";
import { put, call, fork, cancelled, take, select } from "redux-saga/effects";

import { getTileForPixel } from "features/rendering";

const subscribeToMouse = (canvas) => (emit) => {
  const mouseListener = (mouseEvent) => {
    const [px, py] = [mouseEvent.clientX, mouseEvent.clientY];
    emit({px, py});
  }

  canvas.addEventListener("click", mouseListener);

  return () => {
    canvas.removeEventListener("click", mouseListener);
  };
};

export const rawMouseChannel = (canvas) => eventChannel(subscribeToMouse(canvas));

export const takeAsTileClick = function* (rawMouseChannel) {
  const rawCoords = yield take(rawMouseChannel);
  const { px, py } = rawCoords;
  const tileCoords = yield select(getTileForPixel, px, py);
  if (tileCoords) {
    return tileCoords;
  } else {
    console.warn(`Received bad tile coords for raw coords ${rawCoords}!`);
    return;
  }
};
