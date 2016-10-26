import Tinyqueue from "tinyqueue";

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

const distanceFrom = (x0, y0) => (x, y) => (
  Math.sqrt((x-x0)**2 + (y-y0)**2)
);

const pointHash = (x, y) => ((((x+y) * (x+y+1)) / 2) + y);

console.log("Starting A* performance test (no yield)");
const before = new Date();
const [sx, sy] = [200, 200];
const [x0, y0] = [ 10,  10];
const distance = distanceFrom(x0, y0);

const openSet   = new Tinyqueue([], (a, b) => (distance(a) - distance(b)));
const closedSet = {};
const seenSet   = {};

openSet.push([x0, y0]);
seenSet[pointHash(x0, y0)] = true;

let i = 0;
while (openSet.peek()) {
  const [x, y] = openSet.pop();
  const cshash = pointHash(x, y);

  closedSet[cshash] = true;
  // -------------------------------------------------------
  i++; // This is normally where the [x,y] value is yielded
  // -------------------------------------------------------

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

const after = new Date();
const elapsed = after - before;
const rate = Math.round(i / (elapsed / 1000));
i--;
console.log(`Done, ${i} iterations in ${elapsed} ms`);
console.log(`~${rate} iterations/sec`);
