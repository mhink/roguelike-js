import { map } from "lodash";
import {
  cardinalDirections,
  allDirections
} from "util/directions";

export const findDownhill = (dmap, x0, y0, sx, sy) => {
  let lowestVal = 100;
  let lowestDirection = null;

  for (const { dx, dy } of allDirections()) {
    const [x, y] = [x0+dx, y0+dy];
    if (x > 0 && x < sx && y > 0 && y < sy) {
      if(dmap[y][x] < lowestVal) {
        lowestVal = dmap[y][x];
        lowestDirection = { dx, dy };
      }
    }
  }

  return lowestDirection;
}

const lowestNeighborValue = (dmap, x0, y0, sx, sy) => {
  let lowest = 100;

  for (const { dx, dy } of allDirections()) {
    const [x, y] = [x0+dx, y0+dy];

    if (x > 0 && x < sx && y > 0 && y < sy) {
      if(dmap[y][x] < lowest) {
        lowest = dmap[y][x];
      }
    }
  }

  return lowest;
}

export default function(mapDimensions, goalPoints) {
  const { x: sx, y: sy } = mapDimensions;

  let dmap = new Array(sy);
  for (let y = 0; y < sy; y++) {
    dmap[y] = new Array(sx);
    for (let x = 0; x < sx; x++) {
      dmap[y][x] = 100;
    }
  }

  for (const { x, y } of goalPoints) {
    dmap[y][x] = 0;
  }

  let repeat = false;
  let iterations = 0;
  do {
    iterations++;
    repeat = false;
    const nextMap = [];

    for (let y = 0; y < sy; y++) {
      const nextRow = [];

      for (let x = 0; x < sx; x++) {
        const lval = lowestNeighborValue(dmap, x, y, sx, sy);

        if(dmap[y][x] - 2 >= lval) {
          nextRow.push(lval + 1);
          repeat = true;
        } else {
          nextRow.push(dmap[y][x]);
        }
      }

      nextMap.push(nextRow);
    }

    dmap = nextMap;
  } while (repeat);
  return dmap;
}
