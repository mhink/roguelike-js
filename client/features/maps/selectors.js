import { toPairs, findKey, map, filter } from "lodash";

export const entityCanMoveTo = (state, uuid, { dx, dy }) => {
  const { mapUuid, x: x0, y: y0 } = state.maps.registry[uuid];
  const [x, y] = [x0 + dx, y0 + dy];
  return positionIsClear(state, mapUuid, {x, y});
};

export const positionIsClear = (state, mapUuid, pos) => {
  if (!isPositionInBounds(state, mapUuid, pos)) {
    return false;
  } else if (getWallAtPosition(state, mapUuid, pos) > 0) {
    return false;
  } else if (getEntityAtPosition(state, mapUuid, pos)) {
    return false;
  } else { 
    return true;
  }
};

export const isPositionInBounds = (state, mapUuid, {x,y}) => {
  const { size: { x: sx, y: sy }} = state.maps.maps[mapUuid];
  return !(x < 0 || x >= sx || y < 0 || y >= sy);
};

export const getWallAtPosition = (state, mapUuid, {x,y}) => {
  const { walls, size: {x:sx,y:sy}} = state.maps.maps[mapUuid];
  const i = (y*sx) + (x%sx);
  return walls[i];
};

export const getCurrentMap = (state) => state.maps.currentMap;
export const getCurrentMapDimensions = (state) => getMapDimensions(state, state.maps.currentMap);
export const getMapDimensions = (state, mapUuid) => {
  const map = state.maps.maps[mapUuid];
  return (map && map.size);
}

export const getPlayerPosition = (state) => state.maps.registry[state.player.playerUuid];
export const getPositions = (state) => map(state.maps.registry, (pos, uuid) => [uuid, pos]);
export const getPositionForEntity = (state, uuid) => state.maps.registry[uuid];


// TODO: Make this more efficient when performance starts breaking down!
//
//       The easiest way to do so would be to build an array for the map containing
//       an entity reference (or null) at each position on the map representing
//       the entity at that position.
//
//       When _that_ gets too expensive, represent entities using a quadtree.
export const getEntityAtPosition = (state, mapUuid, {x, y}) => (
  findKey(state.maps.registry, (pos, uuid) => (
        pos.mapUuid === mapUuid
    &&  pos.x === x
    &&  pos.y === y
  ))
);

export const getOtherEntitiesOnMap = (state, entityUuid, mapUuid) => {
  const uuidActorPairs = toPairs(state.maps.registry);
  const pairsOnMap = filter(uuidActorPairs, ([uuid, actor]) => (actor.mapUuid === mapUuid && uuid !== entityUuid));
  const uuidsOnMap = map(pairsOnMap, ([uuid, _]) => uuid);
  return uuidsOnMap;
};
