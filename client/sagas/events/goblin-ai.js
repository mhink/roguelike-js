import { select, put } from "redux-saga/effects";
import { entityCanMoveTo } from "features/maps";

export default function* (uuid) {
  const dx = Math.floor(Math.random() * 3) - 1;
  const dy = Math.floor(Math.random() * 3) - 1;

  const canMove = yield select(entityCanMoveTo, uuid, { dx, dy });
  if (canMove) {
    yield put({
      type:    "MOVE_ENTITY",
      payload: {
        uuid,
        dx,
        dy,
      }
    });
  }
};
