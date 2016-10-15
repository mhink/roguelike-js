import { call } from "redux-saga/effects";
import { ipcSend } from "features/ipc/sagas";

export const quitGameSaga = function* () {
  yield call(ipcSend, { command: "QUIT_APP" });
};
