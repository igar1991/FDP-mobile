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
    currentListFiles: [],
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
        // const list = await fdp.directory.read('my-new-pod', directory)
        const list = [
          {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "first folder",
            type: "folder"
          },
          {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "fecond folder",
            type: "file"
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "fhird folder",
            type: "file"
          },
        ];
        setTimeout(()=>{
        dispatch({ type: GET_LIST_FILES, data: list });
        }, 5000)
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
        //const res = await fdp.directory.create('my-new-pod', 'my-dir')
        const res = {
          id: "bd7acbdddea-c1b1-46c2-aed5-3ad53abb28ba",
          title: name,
          type: "folder"
        }
          dispatch({type: ADD_IN_DIRECTORY, data: res })
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
      uploadFile: async (pod, directory, file)=>{
        //const res = await fdp.file.uploadData('my-new-pod', '/my-dir/myfile.txt', 'Hello world!');
        console.log(pod, directory, file)
        const res = {
          id: "bd7acbdddea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "text",
          type: "file"
        }
        dispatch({type: ADD_IN_DIRECTORY, data: res})
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
