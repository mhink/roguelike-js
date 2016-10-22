import { filter, keys } from 'lodash';

const initialState = {
  callReaper: false,
  registry: {}
};

export const getDeadEntityUuids = (state) => {
  const uuids = keys(state.combat.registry);

  return filter(uuids, (uuid) => (state.combat.registry[uuid].hp <= 0));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REAP_ENTITY": {
      const { uuid } = action.payload;
      const nextRegistry = { ...state.registry };
      delete nextRegistry[uuid];
      return {
        ...state,
        registry: nextRegistry
      }
    }
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
    case "SPAWN_ENTITY": {
      const { uuid, combat } = action.payload;

      if(!combat) return state;
      const { hp, maxHp, atk } = combat;

      return {
        ...state,
        registry: {
          ...state.registry,
          [uuid]: {
            ...combat
          }
        }
      };
    }
    default: {
      return state;
    }
  }
};
