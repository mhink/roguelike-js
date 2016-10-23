import { findKey, map } from "lodash";

export const entityCanMoveTo = (state, uuid, { dx, dy }) => {
  const { mapUuid, x: x0, y: y0 } = state.maps.registry[uuid];
  const { dimensions: { x: sx, y: sy } } = state.maps.maps[mapUuid];
  const [x, y] = [x0 + dx, y0 + dy];
  if (x < 0 || x >= sx || y < 0 || y >= sy) {
    return false;
  } else if (getEntityAtPosition(state, x, y, mapUuid)) {
    return false;
  } else { 
    return true;
  }

};

export const getCurrentMap = (state) => state.maps.currentMap;
export const getCurrentMapDimensions = (state) => {
  const currentMap = state.maps.maps[state.maps.currentMap];
  return currentMap && currentMap.dimensions;
};

export const getPlayerPosition = (state) => state.maps.registry[state.player.playerUuid];
export const getPositions = (state) => map(state.maps.registry, (pos, uuid) => [uuid, pos]);
export const getPositionForEntity = (state, uuid) => state.maps.registry[uuid];

// TODO: make this more efficient!
export const getEntityAtPosition = (state, x, y, mapUuid) => {
  return findKey(state.maps.registry, (pos, uuid) => {
    return (
        pos.mapUuid === mapUuid
    &&  pos.x === x
    &&  pos.y === y
    );
  })
};
