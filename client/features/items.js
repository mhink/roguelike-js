import entityReducer from "util/entity-reducer";

const initialState = {};

export const getItemDetailsForEntity = (state, uuid) => state.items.registry[uuid];

export default entityReducer("item", (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
});
