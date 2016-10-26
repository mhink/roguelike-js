import { eventChannel } from "redux-saga";
import { put, call, fork, cancelled, take, select } from "redux-saga/effects";

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

export const mouseChannel = (canvas) => eventChannel(subscribeToMouse(canvas));

import { getTileForPixel } from "features/rendering";

export const takeEveryMouse = function* (mouseChannel, saga) {
  const task = yield fork(function* () {
    try {
      while (true) {
        const {px, py}  = yield take(mouseChannel);
        const tileCoords = yield select(getTileForPixel, px, py);
        yield fork(saga, tileCoords);
      }
    } finally {
      if (yield cancelled()) {
        mouseChannel.close();
      }
    }
  });
  return task;
};
