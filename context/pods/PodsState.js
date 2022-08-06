import { useMemo, useReducer } from "react";
import { PodsContext } from "./context";
import { PodsReduser } from "./reducer";
import { CHOOSE_POD, ADD_IN_DIRECTORY, CREATE_POD, DELETE_POD, GET_LIST_FILES, GET_LIST_PODS, CHOOSE_FOLDER_FILE, DELETE_FOLDER, DELETE_FILE, CLEAR_PODS, PENDING_PODS, ERROR_PODS } from "./actions";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { FdpStorage } from "@fairdatasociety/fdp-storage";
import {
  Environments,
  getEnvironmentConfig,
} from "@fairdatasociety/fdp-contracts";
import { fdp } from "../auth/AuthState";


export const PodsState = (props) => {
  const initialState = {
    podsList: [],
    currentListFiles: {},
    activePod: null,
    activFolderFile: null,
    statusModalPods: {isVisible: false, message: '', isError: false},
  };

  const [state, dispatch] = useReducer(PodsReduser, initialState);

  const podsContext = useMemo(
    () => ({
      getListPods: async () => {
        try {
          dispatch({type: PENDING_PODS, message: 'Get pods...'});
          const pods = await fdp.personalStorage.list();
          dispatch({ type: GET_LIST_PODS, data: pods });
          dispatch({type: CLEAR_PODS});
        }catch(err) {
          console.log(err.message)
          dispatch({type: ERROR_PODS, message: `Error! ${err.message}`});
        }
      },
      getDerectoryList: async (activePod, directory) => {
        try {
          console.log(directory)
          dispatch({type: PENDING_PODS, message: 'Get files...'});
          const list = await fdp.directory.read(activePod, directory, true)
          console.log('----------------LIST-------------------')
          dispatch({ type: GET_LIST_FILES, data: list.content, directory });
          dispatch({type: CLEAR_PODS});
        } catch(err) {
          dispatch({type: ERROR_PODS, message: `Error! ${err.message}`});
        }
      },
      choosePod: (pod)=>{
        dispatch({type: CHOOSE_POD, pod})
      },
      chooseFolderFile: (item)=>{
        dispatch({type: CHOOSE_FOLDER_FILE, data: item})
      },
      deletePod: async (pod)=>{
        // const res = await fdp.personalStorage.delete('my-new-pod')
        dispatch({type: DELETE_POD, pod})
      },
      createPod: async (name)=>{
        try {
          dispatch({type: PENDING_PODS, message: 'Create pod...'});
          const pod = await fdp.personalStorage.create(name);
          console.log(pod)
          dispatch({type: CREATE_POD, pod});
          dispatch({type: CLEAR_PODS});
        } catch(err) {
          dispatch({type: ERROR_PODS, message: `Error! ${err.message}`});
        }

      },
      createFolder: async (pod, directory, name)=>{
        try {
          console.log(`${directory}${name}`)
          dispatch({type: PENDING_PODS, message: 'Create folder...'});
          const res = await fdp.directory.create(pod.name, `${directory}${name}`);
          dispatch({type: ADD_IN_DIRECTORY, data: {name, reference: undefined }, directory });
          dispatch({type: CLEAR_PODS});
        } catch(err) {
          dispatch({type: ERROR_PODS, message: `Error! ${err.message}`});
        }
      },
      deleteFolder: async (pod, directory, item)=>{
        //const res = await fdp.directory.delete('my-new-pod', 'my-dir')
        dispatch({type: DELETE_FOLDER, data: item})
        console.log("delete folder")
      },
      deleteFile: async (pod, directory, item)=>{
        //const res = await fdp.file.delete('my-new-pod', '/my-dir/myfile.txt')
        dispatch({type: DELETE_FILE, data: item})
        console.log("delete file")
      },
      uploadFile: async (pod, directory, file, name)=>{
        console.log(directory)
        try {
          dispatch({type: PENDING_PODS, message: 'Upload file...'});
          const res = await fdp.file.uploadData(pod.name, `${directory}${name}`, file);
          console.log('----------------FILE-------------------');
          console.log(res);
          console.log('-----------------------------------');
          dispatch({type: ADD_IN_DIRECTORY, data: {...res, reference: true}, directory})
          dispatch({type: CLEAR_PODS});
        } catch(err) {
          dispatch({type: ERROR_PODS, message: `Error! ${err.message}`});
        }
      },
      openFile: async(pod,directory, file)=>{
        //const data = await fdp.file.downloadData('my-new-pod', '/myfile.txt')
        //const uri = FileSystem.documentDirectory + file;
        //const resBase64 = await FileSystem.readAsStringAsync(data, {encoding: FileSystem.EncodingType.Base64});
        //await FileSystem.writeAsStringAsync(uri, resBase64, { encoding: FileSystem.EncodingType.Base64 });
        //await shareAsync(file);
        console.log(pod,directory, file);
      },
      clearModal: ()=>{
        dispatch({type: CLEAR_PODS});
      }
    }),
    []
  );

  return (
    <PodsContext.Provider
      value={{
        ...state,
        ...podsContext,
      }}
    >
      {props.children}
    </PodsContext.Provider>
  );
};
