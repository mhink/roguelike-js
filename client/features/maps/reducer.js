import testMap from "res/test.map";

const initialState = {
  layers: [
    testMap,
    [
      ["player"],
    ]
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
