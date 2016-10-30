import { put, select } from "redux-saga/effects";
import { 
  toggleWall, 
  getCurrentMap, 
  isPositionInBounds,
  getWallAtPosition
} from "features/maps";
import { getOffset } from "features/rendering";

export default function* ({ x: x0, y: y0 }) {
  const mapUuid = yield select(getCurrentMap);
  const {x: dx, y: dy } = yield select(getOffset);
  const pos = {x: x0+dx, y: y0+dy};
  const inBounds = yield select(isPositionInBounds, mapUuid, pos);

  if (inBounds) {
    yield put(toggleWall(x0+dx, y0+dy));
  }
  return false;
}
