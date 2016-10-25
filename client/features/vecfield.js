import { v4 as uuid } from "uuid";

const initVectorField = (size) => {
  const { x: sx, y: sy } = size;
  const xField = new Int8Array(sx * sy);
  const yField = new Int8Array(sx * sy);
  yField.fill(4);
  xField.fill(4);

  return {
    size,
    xField, 
    yField
  };
}

const getIndexForPoint = (size, x, y) => {
  const { x: sx } = size;
  return (y * sx) + (x % sx);
};

const initialState = {
  field: null
};

export const getVectorAtPoint = (state, x, y) => {
  const { size, xField, yField } = state.vecfield.field;
  const { x: sx, y: sy } = size;
  const i = getIndexForPoint(size, x, y);
  return {
    x: xField[i],
    y: yField[i]
  };
};

export const createVectorField = (sx, sy) => ({
  type: "CREATE_VECTOR_FIELD",
  payload: {
    size: { x: sx, y: sy }
  }
});

export default (state = initialState, action) => {
  switch(action.type) {
    case "CREATE_VECTOR_FIELD": {
      const { size } = action.payload;
      return {
        ...state,
        field: initVectorField(size)
      };
    }
    default: {
      return state;
    }
  }
};
