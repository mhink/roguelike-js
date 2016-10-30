function* nudgeVecField(coords) {
  const { x:dx, y:dy } = yield select(getOffset);
  yield put({
    type: "DECAY_VECTOR_FIELD",
    payload: {
      decayFactor: 0.5
    }
  });
  yield put({
    type: "NUDGE_VECTOR_FIELD",
    payload: {
      cutoff: 0.05,
      intensity: 5,
      point: {
        x: coords.x+dx, 
        y: coords.y+dy,
      }
    }
  });
}


