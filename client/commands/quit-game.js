import { call } from "redux-saga/effects";
import { putIpc } from "ipc-sagas";

export default function* () {
  yield putIpc("ipc-saga", { command: "QUIT_APP" });
};
