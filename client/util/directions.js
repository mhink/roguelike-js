export function* cardinalDirections() {
  yield { dx:  0, dy:  1 };
  yield { dx:  0, dy: -1 };
  yield { dx:  1, dy:  0 };
  yield { dx: -1, dy:  0 };
};

export function* allDirections() {
  yield { dx:  0, dy:  1 };
  yield { dx:  0, dy: -1 };
  yield { dx:  1, dy:  0 };
  yield { dx: -1, dy:  0 };

  yield { dx:  1, dy:  1 };
  yield { dx:  1, dy: -1 };
  yield { dx: -1, dy:  1 };
  yield { dx: -1, dy: -1 };
}
