import { ipcRenderer } from "electron";
import { eventChannel } from "redux-saga";
import { put, call, take, cancelled } from "redux-saga/effects";

const subscribeToIpc = (emitter) => {
  const ipcListener = (event, ...args) => {
    emitter({
      event,
      payload: args
    });
  };

  ipcRenderer.on("ipc-saga", ipcListener);

  return () => {
    ipcRenderer.removeListener("ipc-saga", ipcListener);
  };
};

export const ipcSend = function* (payload) {
  yield call([ipcRenderer, ipcRenderer.send], "ipc-saga", payload);
};

export const actionToIpc = function* (action) {
  yield call([ipcRenderer, ipcRenderer.send], "ipc-saga", action.payload);
};

export const ipcToAction = function* (actionType) {
  const channel = yield eventChannel(subscribeToIpc);

  try {
    while (true) {
      const { payload } = yield take(channel);
      yield put({ type: actionType, payload });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
};
