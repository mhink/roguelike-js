import { shuffle } from "lodash";
import { select, put } from "redux-saga/effects";
import { entityCanMoveTo } from "features/maps";

const DIRECTIONS = [
  { dx: -1, dy: +0 },
  { dx: +0, dy: +1 },
  { dx: +0, dy: -1 },
  { dx: +1, dy: +0 },
  { dx: -1, dy: -1 },
  { dx: +1, dy: -1 },
  { dx: -1, dy: +1 },
  { dx: +1, dy: +1 },
];

export default function* (uuid) {
  const dirs = shuffle(DIRECTIONS);

  for(const { dx, dy } of dirs) {
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
      return;
    }
  }
};
