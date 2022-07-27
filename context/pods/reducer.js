import { CHOOSE_POD, CREATE_POD, DELETE_POD, GET_LIST_FILES, GET_LIST_PODS, IN_POD } from "./actions";

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
      };
    case CHOOSE_POD: 
      return {
        ...state,
        activePod: action.pod,
      };
    case DELETE_POD:
      const listPods = state.podsList.filter((el)=>el.id !== action.pod.id)
      return {
        ...state,
        podsList: listPods
      };
    case CREATE_POD:
      return {
        ...state,
        podsList: [...state.podsList, action.pod]
      }      
    default:
      return state;
  }
};
