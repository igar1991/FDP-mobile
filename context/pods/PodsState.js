import { useMemo, useReducer } from "react";
import { PodsContext } from "./context";
import { PodsReduser } from "./reducer";
import { GET_LIST_FILES, GET_LIST_PODS, IN_POD } from "./actions";

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
      inPod: async (name) => {
        // const list = await fdp.directory.read('my-new-pod', '/')
        const list = [
          {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "First folder",
          },
          {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Second folder",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Third folder",
          },
        ];
        dispatch({ type: IN_POD, data: list, pod: name });
      },
      getDerectoryList: async (activePod, directory) => {
        // const list = await fdp.directory.read('my-new-pod', directory)
        const list = [
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
          },
        ];
        console.log(directory)
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
