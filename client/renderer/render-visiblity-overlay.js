import { getPlayerPosition } from 'features/maps';

export default (context2d, state) => {
  const { mapUuid, x, y } = getPlayerPosition(state); 
};
