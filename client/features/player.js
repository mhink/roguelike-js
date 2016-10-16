const initialState = {
  playerUuid: null
};

export const getPlayerUuid = (state) => state.player.playerUuid;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SPAWN_ENTITY": {
      const { uuid, player } = payload;
      if (player) {
        return {
          playerUuid: uuid
        };
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};
