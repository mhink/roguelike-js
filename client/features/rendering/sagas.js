import { takeEvery } from "redux-saga";
import { select, put } from "redux-saga/effects";

import { 
  getPlayerPosition,
} from "features/maps/reducer";

export const resetCameraSystem = function* () {
  yield takeEvery("SET_MOVE_MODE", function* ({ payload }) {
    if(payload.moveMode === "player") {
      const { x, y } = yield select(getPlayerPosition);
      yield put({ type: "RESET_OFFSET", payload: { x: -x, y: -y }});
    }
  });
}
