import entityReducer from "util/entity-reducer";

const initialState = {};

export default entityReducer("disposition", (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
});
