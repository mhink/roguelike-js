const initialState = {
  playerUuid: null,
  gameOver: false
};

export const getGameOver = (state) => state.player.gameOver;
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
    case "REAP_ENTITY": {
      const { uuid } = payload;
      if (uuid === state.playerUuid) {
        return {
          ...state,
          playerUuid: null,
          gameOver: true
        }
      }
    }
    default: {
      return state;
    }
  }
};
