import { take, call } from "redux-saga/effects";

import clearMessage from "./clear-message";
import moveCamera from "./move-camera";
import movePlayer from "./move-player";
import quitGame from "./quit-game";
import setInputMode from "./set-input-mode";
import debugIpc from "./debug-ipc";

const SAGA_FOR_COMMAND = {
  "MOVE_CAMERA":    moveCamera,
  "MOVE_PLAYER":    movePlayer,
  "SET_INPUT_MODE": setInputMode,
  "QUIT_GAME":      quitGame,
  "DEBUG_IPC":      debugIpc
};

export default function* ({ command, payload = {} }) {
  yield call(clearMessage);
  const commandSaga = SAGA_FOR_COMMAND[command];
  if (commandSaga) {
    yield call(commandSaga, payload);
  } else {
    console.warn(`commandSystem received a command with no corresponding saga: ${command}`);
    console.warn("Payload was:", payload);
  }
}
