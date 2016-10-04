import { ipcRenderer } from "electron";
import { takeEvery, eventChannel } from "redux-saga";
import { put, call, take, cancelled } from "redux-saga/effects";

const subscribeToIpc = (emitter) => {
  const debugListener = (event, ...args) => {
    emitter({
      event,
      payload: args
    });
  };

  ipcRenderer.on("debug", debugListener);

  return () => {
    ipcRenderer.removeListener("debug", debugListener);
  };
};

const actionToIpc = function* (pattern) {
  while (true) {
    const action = yield take(pattern);
    yield call([ipcRenderer, ipcRenderer.send], "debug", action);
  }
};

const ipcToAction = function* (actionType) {
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

const sendIpc = function* (action) {
  yield put({ type: "IPC_REQUEST", payload: action });
};

const logIpcResponse = function* (action) {
  yield call([console, console.log], action); // eslint-disable-line no-console
};

const helloDebugSaga = function* () {
  yield call([console, console.log], "Hello, debug!"); // eslint-disable-line no-console
};

export default function* debugSaga() {
  yield [
    call(helloDebugSaga),
    actionToIpc("IPC_REQUEST"),
    ipcToAction("IPC_RESPONSE"),

    takeEvery("PLAYER_MOVE", sendIpc),
    takeEvery("IPC_RESPONSE", logIpcResponse)
  ];
}
