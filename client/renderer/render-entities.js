import { getPositions } from "features/maps";
import { getOffset } from "features/rendering";
import { getTileForEntity } from "features/tilesets";
import drawTile from './draw-tile';

export default (context2d, state) => {
  const positions = getPositions(state);
  const { x: dx, y: dy } = getOffset(state);

  for (const [uuid, { x: x0, y: y0 }] of positions) {
    const { name: tileName } = getTileForEntity(state, uuid);
    const dPos = { x: x0 - dx, y: y0 - dy };
    drawTile(context2d, state, tileName, dPos);
  }
};
