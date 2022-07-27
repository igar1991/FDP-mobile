import { useMemo, useReducer } from "react";
import { PodsContext } from "./context";
import { PodsReduser } from "./reducer";
import { CHOOSE_POD, CREATE_FOLDER, CREATE_POD, DELETE_POD, GET_LIST_FILES, GET_LIST_PODS, IN_POD } from "./actions";

export const PodsState = (props) => {
  const initialState = {
    podsList: [],
    currentListFiles: [],
    activePod: null,
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
        dispatch({ type: GET_LIST_PODS, data: pods });
      },
      choosePod: (pod)=>{
        dispatch({type: CHOOSE_POD, pod})
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
          dispatch({type: CREATE_FOLDER, data: res })
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
        dispatch({ type: GET_LIST_FILES, data: list });
      },
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
