const initialState = {
  playerUuid: null
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case "SPAWN_ENTITY": {
      const { uuid, player } = payload;
      if(player) {
        return {
          playerUuid: uuid,
        }
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};
