import { v4 as uuid } from "uuid";
import { 
  allDirections,
  allNeighbors,
  allNeighborsPolar
} from "util/directions";
import iterateOutward from "util/a-star";

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

// decay functions
const inverse = (r, c) => (c / r);
const inverseCube = (r, c) => (c / (r ** 3));
const step = (r, rs) => (r < rs ? r : 0);

const inverseSquare = (r, c, d) => ((r * c + d) ** -2);

export default (state = initialState, action) => {
  switch(action.type) {
    case "RUN_CLOCK":
    case "DECAY_VECTOR_FIELD": {
      const { payload = {} } = action;
      const { decayConstant = 0.5 } = payload;
      const { field } = state;
      if (!field) return state;
      const { rField } = field;
      const nextRField = Float32Array.from(rField)

      for (let i = 0; i < nextRField.length; i++) {
        const r0 = nextRField[i];
        const dR = (decayConstant * r0);
        const r1 = r0 - dR;
        nextRField[i] = r1 < 0.05 ? r1 : r1;
      }

      return {
        ...state,
        field: {
          ...state.field,
          rField: nextRField
        }
      };
    }
    case "NUDGE_VECTOR_FIELD": {
      const { cutoff, intensity, point: origin } = action.payload;
      const { field } = state;
      if (!field) return state;

      const { size, thetaField, rField } = field;
      const nextThetaField = Float32Array.from(thetaField);
      const nextRField = Float32Array.from(rField);

      const ix = getIndexForPoint.bind(this, size);
      const iter = iterateOutward(size, origin);
      iter.next(); // TODO: remove the need for this hack

      let next = iter.next(); 
      let first = true;

      do {
        const [x,y,r] = next.value;
        const xVecToPoint = (x - origin.x);
        const yVecToPoint = (y - origin.y);

        const dTheta = Math.atan2(yVecToPoint, xVecToPoint); // Direction of vector change
        const dR = inverseSquare(r, 0.1, 0.25);
        const dx = dR * Math.cos(dTheta);
        const dy = dR * Math.sin(dTheta);

        const th0 = thetaField[ix(x,y)]; // angle of vector at vecfield[x,y]
        const r0 = rField[ix(x,y)];      // magnitude of vector at vecfield[x,y]
        const x0 = r0 * Math.cos(th0);   // x-component of vector at vecfield[x,y]
        const y0 = r0 * Math.sin(th0);   // y-component of vector at vecfield[x,y]
        
        const nextX = x0 - dx;
        const nextY = y0 - dy;
        const nextTheta = Math.atan2(nextY, nextX);
        const nextR = Math.sqrt((nextX ** 2) + (nextY ** 2));

        nextThetaField[ix(x,y)] = nextTheta;
        nextRField[ix(x,y)] = nextR;

        next = iter.next(dR < cutoff);
        first = false;
      } while (!next.done);

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
