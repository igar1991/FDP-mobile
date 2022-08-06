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
  PENDING_PODS,
  ERROR_PODS,
  CLEAR_PODS,
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
        currentListFiles: { ...state.currentListFiles, [action.directory]: action.data },
      };
    case CHOOSE_POD:
      return {
        ...state,
        activePod: action.pod,
        currentListFiles: {}
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
        currentListFiles: {...state.currentListFiles, [action.directory]: [...state.currentListFiles[action.directory],action.data]},
      };
      case PENDING_PODS:
        return {
          ...state,
          statusModalPods: {isVisible: true, message: action.message, isError: false}
        };
      case ERROR_PODS:
        return {
          ...state,
          statusModalPods: {isVisible: true, message: action.message, isError: true}
        };
      case CLEAR_PODS:
        return {
          ...state,
          statusModalPods: {isVisible: false, message: '', isError: false}
        }  ;           
    default:
      return state;
  }
};
