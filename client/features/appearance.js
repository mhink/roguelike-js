import entityReducer from "util/entity-reducer";

const initialState = {};

export default entityReducer("appearance", (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
});
