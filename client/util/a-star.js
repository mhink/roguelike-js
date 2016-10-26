import Tinyqueue from "tinyqueue";
import { 
  allNeighbors as neighbors
} from "./directions";

const distanceFrom = ({ x: x0, y: y0 }) => (x, y) => (
  Math.sqrt((x-x0)**2 + (y-y0)**2)
);

const pointHash = (x, y) => ((((x+y) * (x+y+1)) / 2) + y);

const iterateOutward = function* (size, origin) {
  const { x: sx, y: sy } = size;
  const { x: x0, y: y0 } = origin;
  const distance = distanceFrom(origin);

  // This might be backwards.
  const openSet = new Tinyqueue([], (a, b) => 
    distance(a) - distance(b)
  );

  // keys of type { x, y }
  const closedSet = {};
  const seenSet = {};

  openSet.push([x0, y0]);
  seenSet[pointHash(origin.x, origin.y)] = true;

  while (openSet.peek()) {
    const [x, y] = openSet.pop();
    const cshash = pointHash(x, y);

    closedSet[cshash] = true;
    yield [x, y, distance(x, y)];

    for (const [dx,dy] of ALL_DIRECTIONS) {
      const nbx = x + dx;
      const nby = y + dy;
      if (nbx <  0) continue;
      if (nbx >= sx) continue;
      if (nby <  0) continue;
      if (nby >= sy) continue;
      const ncshash = pointHash(nbx, nby);

      if (closedSet[ncshash]) continue;
      if (seenSet[ncshash]) continue;

      openSet.push([nbx, nby]);
      seenSet[ncshash] = true;
    }
  }
};

const ALL_DIRECTIONS = [
  [  1,  0 ], // east
  [  1,  1 ], // southeast
  [  0,  1 ], // south
  [ -1,  1 ], // southwest
  [ -1,  0 ], // west
  [ -1, -1 ], // northwest
  [  0, -1 ], // north
  [  1, -1 ], // northeast
];

export default iterateOutward;
