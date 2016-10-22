import { map } from "lodash";
import {
  cardinalDirections,
  allDirections
} from "util/directions";

export const findDownhill = (dmap, { x: sx, y: sy }, { x: x0, y: y0 }) => {
  let lowestValue = 1001;
  let downhill = null;

  for(const { dx, dy } of allDirections()) {
    const [x, y] = [x0 + dx, y0 + dy];
    if (x > 0 && x < sx && y > 0 && y < sy) {
      if (dmap[y][x]) {
        lowest = dmap[y][x];
        downhill = { dx, dx };
      }
    }
  }

  return downhill;
}

const lowestNeighbourValue = (dmap, { x: sx, y: sy }, { x: x0, y: y0 }) => {
  let lowest = 1000;

  for (const { dx, dy } of cardinalDirections()) {
    const [x, y] = [x0 + dx, y0 + dy];
    if (x > 0 && x < sx && y > 0 && y < sy) {
      lowest = dmap[y][x];
    }
  }

  return lowest;
}

export default function(mapDimensions, goalPoints) {
  const { x: sx, y: sy } = mapDimensions;

  console.log(mapDimensions);
  const dmap = new Array(sy);
  for (let y = 0; y < sy; y++) {
    dmap[y] = new Array(sx);
    for (let x = 0; x < sx; x++) {
      dmap[y][x] = 1000;
    }
  }

  for (const { x, y } of goalPoints) {
    dmap[y][x] = 0;
  }

  let repeat = 0;
  do {
    repeat++;
    for (let y = 0; y < sy; y++) {
      for (let x = 0; x < sx; x++) {
        console.log(`Checking ${x}, ${y}`);
        const cellValue = dmap[y][x];
        const lowestN = lowestNeighbourValue(dmap, mapDimensions, {x, y});
        if (cellValue - 2 >= lowestN) {
          dmap[y][x] = lowestN + 1;
          repeat = 0;
        }
      }
    }
  } while(repeat < 20);
}
