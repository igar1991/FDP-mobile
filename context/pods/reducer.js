import {
  CHOOSE_POD,
  ADD_IN_DIRECTORY,
  CREATE_POD,
  DELETE_POD,
  GET_LIST_FILES,
  GET_LIST_PODS,
  IN_POD,
  CHOOSE_FOLDER_FILE,
  DELETE_FOLDER,
  DELETE_FILE,
  CHANGE_STATUS,
} from "./actions";

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
    case CHOOSE_FOLDER_FILE:
      return {
        ...state,
        activFolderFile: action.data,
      };
    case DELETE_POD:
      const listPods = state.podsList.filter((el) => el.id !== action.pod.id);
      return {
        ...state,
        podsList: listPods,
      };
    case DELETE_FOLDER:
      const folderList = state.currentListFiles.filter(
        (el) => el.id !== action.data.id
      );
      return {
        ...state,
        currentListFiles: folderList,
        activFolderFile: null,
      };
    case DELETE_FILE:
      const fileList = state.currentListFiles.filter(
        (el) => el.id !== action.data.id
      );
      return {
        ...state,
        currentListFiles: fileList,
        activFolderFile: null,
      };
    case CREATE_POD:
      return {
        ...state,
        podsList: [...state.podsList, action.pod],
      };
    case ADD_IN_DIRECTORY:
      return {
        ...state,
        currentListFiles: [...state.currentListFiles, action.data],
      };
    case CHANGE_STATUS:
      return {
        ...state,
        statusUpdateItem: action.data
      }  
    default:
      return state;
  }
};
