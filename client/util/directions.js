import { shuffle } from "lodash";

export function* cardinalDirections() {
  yield { dx:  0, dy:  1 };
  yield { dx:  0, dy: -1 };
  yield { dx:  1, dy:  0 };
  yield { dx: -1, dy:  0 };
};

const ALL_DIRECTIONS = [
  { dx:  0, dy:  1 },
  { dx:  0, dy: -1 },
  { dx:  1, dy:  0 },
  { dx: -1, dy:  0 },
  { dx:  1, dy:  1 },
  { dx:  1, dy: -1 },
  { dx: -1, dy:  1 },
  { dx: -1, dy: -1 },
];

export function* allDirections() {
  for(const dir of shuffle(ALL_DIRECTIONS)) {
    yield dir;
  }
}

export function* allNeighborsPolar(pos, bounds) {
  const { x: x0, y: y0 } = pos;
  const { x: sx, y: sy } = bounds;

  for (const {dx, dy} of allDirections()) {
    const [x, y] = [x0 + dx, y0 + dy];
    if (x >= 0 && x < sx && y >= 0 && y < sy) {
      const theta = Math.atan2(y0-y, x0-x);
      const r = Math.sqrt((y0-y)**2 + (x0-x)**2);
      yield { x, y, theta, r};
    }
  }
}

export function* allNeighbors(pos, bounds) {
  const { x: x0, y: y0 } = pos;
  const { x: sx, y: sy } = bounds;

  for (const {dx, dy} of allDirections()) {
    const [x, y] = [x0 + dx, y0 + dy];
    if (x >= 0 && x < sx && y >= 0 && y < sy) {
      yield { x, y };
    }
  }
}
