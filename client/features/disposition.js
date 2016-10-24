import { keys } from "lodash";
import entityReducer, {
  updateEntity
} from "util/entity-reducer";

const initialState = {};

export const getDebugDisposition = (state) => keys(state.disposition.registry)[0];
export default entityReducer("dispositions", (state = initialState, action) => {
  switch (action.type) {
    case "SET_ATTRACTOR_MAP": {
      const { uuid, dmap } = action.payload;
      if(state.registry[uuid]) {
        return updateEntity(state, uuid, {
          attraction: dmap
        });
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
});
