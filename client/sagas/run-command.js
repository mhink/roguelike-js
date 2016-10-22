import { put, select, call } from "redux-saga/effects";
import { getMessage } from "features/rendering";

import SAGA_FOR_COMMAND from "commands";

export default function* ({ command, payload = {} }) {
  if (yield select(getMessage)) {
    yield put({ type: "CLEAR_MESSAGE" });
  }

  const commandSaga = SAGA_FOR_COMMAND[command];
  if (commandSaga) {
    return yield call(commandSaga, payload);
  } else {
    console.warn(`commandSystem received a command with no corresponding saga: ${command}`);
    console.warn("Payload was:", payload);
    return false;
  }
}
