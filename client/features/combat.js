import entityReducer from "util/entity-reducer";
import { filter, keys } from 'lodash';

const initialState = {
  callReaper: false,
};

export const getCombatDetailsForEntity = (state, uuid) => state.combat.registry[uuid];
export const getDeadEntityUuids = (state) => {
  const uuids = keys(state.combat.registry);

  return filter(uuids, (uuid) => (state.combat.registry[uuid].hp <= 0));
};

export default entityReducer("combat", (state = initialState, action) => {
  switch (action.type) {
    case "DO_COMBAT": {
      const { attackerUuid, targetUuid } = action.payload;
      const { hp: targetHp } = state.registry[targetUuid];
      const { atk: attackerAtk } = state.registry[attackerUuid];
      const nextTargetHp = targetHp - attackerAtk;
      const nextReap = (nextTargetHp <= 0);

      return {
        ...state,
        callReaper: nextReap,
        registry: {
          ...state.registry,
          [targetUuid]: {
            ...state.registry[targetUuid],
            hp: nextTargetHp
          }
        }
      };
    }
    default: {
      return state;
    }
  }
});
