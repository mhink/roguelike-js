import { putIpc } from "sagas/ipc-saga-helpers";

export default function* () {
  yield putIpc("ipc-saga", { command: "QUIT_APP" });
  return false;
}
