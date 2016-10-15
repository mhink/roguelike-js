import { call } from "redux-saga/effects";
import { putIpc } from "ipc-saga-helpers";

export default function* () {
  yield putIpc("ipc-saga", { command: "PING" });
};
