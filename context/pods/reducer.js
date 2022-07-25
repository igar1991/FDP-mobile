import { GET_LIST_FILES, GET_LIST_PODS, IN_POD } from "./actions";

export const PodsReduser = (state, action) => {
  switch (action.type) {
    case GET_LIST_PODS:
      return {
        ...state,
        podsList: action.data,
      };
    case GET_LIST_FILES:
      return {
        ...state,
        currentListFiles: action.data,
      };
    case IN_POD:
      return {
        ...state,
        currentListFiles: action.data,
        activePod: action.pod,
      };
    default:
      return state;
  }
};
