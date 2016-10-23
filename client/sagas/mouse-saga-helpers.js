import { eventChannel } from "redux-saga";
import { put, call, fork, cancelled, take, select } from "redux-saga/effects";

const subscribeToMouse = (canvas) => (emitter) => {
  const mouseListener = (mouseEvent) => {
    // const [cx, cy] = [mouseEvent.clientX, mouseEvent.clientY];
  }

  canvas.addEventListener("mousemove", mouseListener);

  return () => {
    canvas.removeEventListener("mousemove", mouseListener);
  };
};

export const mouseChannel = (canvas) => eventChannel(subscribeToMouse(canvas));
