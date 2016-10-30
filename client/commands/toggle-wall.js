import { put, select } from "redux-saga/effects";
import { toggleWall } from "features/maps";
import { getOffset } from "features/rendering";

export default function* ({ x: x0, y: y0 }) {
  const {x: dx, y: dy } = yield select(getOffset);
  yield put(toggleWall(x0+dx, y0+dy));
  return false;
}
