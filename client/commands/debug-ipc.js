import { putIpc } from "sagas/ipc-saga-helpers";

export default function* () {
  yield putIpc("ipc-saga", { command: "PING" });
  return false;
}
