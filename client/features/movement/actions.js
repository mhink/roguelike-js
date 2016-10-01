export const PLAYER_MOVE = 'PLAYER_MOVE';

export const move = (direction) => ({
  type: PLAYER_MOVE,
  direction
});
