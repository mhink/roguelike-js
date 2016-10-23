import entityReducer from "util/entity-reducer";

const initialState = {};

export const getAppearanceForEntity = (state, uuid) => state.appearance.registry[uuid];

export default entityReducer("appearance", (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
});
