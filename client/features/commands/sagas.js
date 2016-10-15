import { take, call } from "redux-saga/effects";

import { clearMessageSaga } from "./clear-message-saga";
import { movePlayerSaga } from "./move-player-saga";
import { moveCameraSaga } from "./move-camera-saga";
import { setInputModeSaga } from "./set-input-mode-saga";
import { quitGameSaga } from "./quit-game-saga";

const SAGA_FOR_COMMAND = {
  "MOVE_CAMERA":    moveCameraSaga,
  "MOVE_PLAYER":    movePlayerSaga,
  "SET_INPUT_MODE": setInputModeSaga,
  "QUIT_GAME":      quitGameSaga
};

export const commandSystem = function* (commandSource) {
  while (true) {
    const { command, payload = {} } = yield take(commandSource);
    yield call(clearMessageSaga);
    const commandSaga = SAGA_FOR_COMMAND[command];
    if (commandSaga) {
      yield call(commandSaga, payload);
    } else {
      console.warn(`commandSystem received a command with no corresponding saga: ${command}`);
      console.warn("Payload was:", payload);
    }
  }
};
