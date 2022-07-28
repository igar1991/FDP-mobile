import { useMemo, useReducer } from "react";
import { PodsContext } from "./context";
import { PodsReduser } from "./reducer";
import { CHOOSE_POD, ADD_IN_DIRECTORY, CREATE_POD, DELETE_POD, GET_LIST_FILES, GET_LIST_PODS, IN_POD, CHOOSE_FOLDER_FILE, DELETE_FOLDER, DELETE_FILE, CHANGE_STATUS } from "./actions";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export const PodsState = (props) => {
  const initialState = {
    podsList: [],
    currentListFiles: [],
    activePod: null,
    activFolderFile: null,
    statusUpdateItem: null
  };

  const [state, dispatch] = useReducer(PodsReduser, initialState);

  const podsContext = useMemo(
    () => ({
      getListPods: async () => {
        //const pods = await fdp.personalStorage.list()
        const pods = [
          {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "First Item",
          },
          {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Second Item",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Third Item",
          }
        ];
        dispatch({type: CHANGE_STATUS, data: "pending"})
        setTimeout(()=>{
          dispatch({ type: GET_LIST_PODS, data: pods });
          dispatch({type: CHANGE_STATUS, data: null})
        }, 0)
        
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
        dispatch({type: CHANGE_STATUS, data: "pending"})
        setTimeout(()=>{
        dispatch({ type: GET_LIST_FILES, data: list });
        dispatch({type: CHANGE_STATUS, data: null})
        }, 5000)
      },
      choosePod: (pod)=>{
        dispatch({type: CHOOSE_POD, pod})
      },
      chooseFolderFile: (item)=>{
        dispatch({type: CHOOSE_FOLDER_FILE, data: item})
      },
      inPod: async (pod) => {
        // const list = await fdp.directory.read('my-new-pod', '/')
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
        dispatch({type: CHOOSE_POD, pod})
        dispatch({ type: IN_POD, data: list });
        
      },
      deletePod: async (pod)=>{
        // const res = await fdp.personalStorage.delete('my-new-pod')
        dispatch({type: DELETE_POD, pod})
      },
      createPod: async (name)=>{
          // const pod = await fdp.personalStorage.create('my-new-pod')
          const pod = {id: '111', title: name}
          dispatch({type: CREATE_POD, pod})
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
