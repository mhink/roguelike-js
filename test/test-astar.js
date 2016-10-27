import iterOut, { distanceFrom } from "../client/util/a-star";

const ORIGIN = { x: 1, y: 1 };
const SIZE   = { x: 5, y: 5 };

const iter = iterOut(SIZE, ORIGIN);

let next;

console.log("Starting A* test (with yield)");
const before = new Date();
let i = 0;
while (++i) {
  if (i > 500000) break;
  const next = iter.next();
  console.log(next.value);
  if (next.done) break;
}
const after = new Date();
const elapsed = after - before;
const rate = Math.round(i / (elapsed / 1000));
i--;
console.log(`Done, ${i} iterations in ${elapsed} ms`);
console.log(`~${rate} iterations/sec`);
