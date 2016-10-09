import { v4 as uuid } from 'uuid';

const initialState = {
  player: null,
  entities: {},
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case "SPAWN_PLAYER": {
      const playerUuid = uuid();
      return {
        ...state,
        player: playerUuid,
        entities: {
          ...state.entities,
          [playerUuid]: payload,
        }
      };
    }
    default: {
      return state;
    }
  }
}
