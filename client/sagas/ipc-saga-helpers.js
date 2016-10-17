/* eslint no-shadow: ["error", { "allow": ["ipcChannel"]}] */
import { ipcRenderer } from "electron";
import { eventChannel } from "redux-saga";
import { fork, call, take, cancelled } from "redux-saga/effects";

const subscribeToIpc = (ipcChannelName) => (emit) => {
  const ipcListener = (event, payload) => {
    emit({
      event,
      payload
    });
  };

  ipcRenderer.on(ipcChannelName, ipcListener);

  return () => {
    ipcRenderer.removeListener(ipcChannelName, ipcListener);
  };
};

export const ipcChannel = (ipcChannelName) => {
  return eventChannel(subscribeToIpc(ipcChannelName));
};

export const putIpc = (channel, payload) => {
  return call([ipcRenderer, ipcRenderer.send], channel, payload);
};

export const takeEveryIpc = function* (ipcChannel, saga, ...args) {
  const task = yield fork(function* () {
    try {
      while (true) {
        const ipcResponse = yield take(ipcChannel);
        yield fork(saga, ...args.concat(ipcResponse));
      }
    } finally {
      if (yield cancelled()) {
        ipcChannel.close();
      }
    }
  });

  return task;
};
