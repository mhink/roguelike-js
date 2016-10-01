import { ipcRenderer } from 'electron';
import { takeEvery, eventChannel, END } from 'redux-saga';
import { put, fork, call, take, cancelled } from 'redux-saga/effects';

const subscribeToIpc = (emitter) => {
  const debugListener = (event, ...args) => {
    emitter({
      event, 
      payload: args
    });
  }

  ipcRenderer.on("debug", debugListener);

  return () => {
    ipcRenderer.removeListener("debug", debugListener);
  };
};

function *actionToIpc(pattern) {
  while(true) {
    const { type, ...payload } = yield take(pattern);
    yield call([ipcRenderer, ipcRenderer.send], "debug", payload);
  }
}

function *ipcToAction(actionType) {
  const channel = yield eventChannel(subscribeToIpc);

  try {
    while (true) {
      const { payload } = yield take(channel);
      yield put({ type: actionType, payload });
    }
  } finally {
    if(yield cancelled()) {
      channel.close();
    }
  }
}

function *sendIpc(action) {
  yield put({ type: "IPC_REQUEST", payload: action });
}

function *logIpcResponse(action) {
  yield call([console, console.log], action);
}

export default function *debugSaga(event) {
  yield [
    actionToIpc("IPC_REQUEST"),
    ipcToAction("IPC_RESPONSE"),

    takeEvery("PLAYER_MOVE", sendIpc),
    takeEvery("IPC_RESPONSE", logIpcResponse),
  ];
}
