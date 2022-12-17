
import reducers from "..";

export const SET_TOKEN = 'set_token'
export const REMOVE_TOKEN = 'remove_token'

const initialState = {
  token: null,
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      }

      case REMOVE_TOKEN:
        return {
          ...state,
          token: null,
        }

    default:
      return state;
  }
};

export default reducer;
