import { fork } from "redux-saga/effects";
import debugSaga from "features/debug/sagas";
import tilesetsSaga from "features/tilesets/sagas";

function *helloRootSaga() {
  console.log("Hello, root saga!");
}

export default function *rootSaga() {
  yield [
    fork(helloRootSaga),
    fork(debugSaga),
    fork(tilesetsSaga)
  ];
}
