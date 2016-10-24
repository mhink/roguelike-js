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
