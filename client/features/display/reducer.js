import testMap from "res/test.map";

const initialState = {
  layers: [
    testMap
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
