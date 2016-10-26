import { v4 as uuid } from "uuid";
import { 
  allDirections,
  allNeighbors,
  allNeighborsPolar
} from "util/directions";

const getPointForIndex = (size, i) => {
  const x = i % size.x
  const y = Math.floor(y / size.x);
}

const getIndexForPoint = (size, x, y) => {
  const { x: sx } = size;
  return (y * sx) + (x % sx);
};

const initialState = {
  field: null
};

export const getVectorAtPoint = (state, x, y) => {
  const { size, thetaField, rField } = state.vecfield.field;
  const { x: sx, y: sy } = size;
  const i = getIndexForPoint(size, x, y);
  return {
    theta: thetaField[i],
    r: rField[i]
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
    case "OVERWRITE_VECTOR_FIELD": {
      const { point: { x: x0, y: y0 } } = action.payload;
      const { field } = state;
      if (!field) return state;

      const { size, thetaField, rField } = field;
      const nextThetaField = Float32Array.from(thetaField);
      const nextRField = Float32Array.from(rField);

      const ix = getIndexForPoint.bind(this, size);
      for(const {x, y, theta, r} of allNeighborsPolar({x: x0, y: y0}, size)) {
        console.log(x, y, theta, r);
        nextThetaField[ix(x, y)] = theta;
        nextRField[ix(x, y)] = 5 / (r ** 2);
      }
      return {
        ...state,
        field: {
          ...field,
          thetaField: nextThetaField,
          rField: nextRField
        }
      };
    }
    case "CREATE_VECTOR_FIELD": {
      const { size } = action.payload;
      const { x: sx, y: sy } = size;
      const thetaField = new Float32Array(sx * sy);
      const rField = new Float32Array(sx * sy);
      rField.fill(0);
      thetaField.fill(0);

      return {
        ...state,
        field: {
          size,
          thetaField,
          rField
        }
      };
    }
    default: {
      return state;
    }
  }
};
