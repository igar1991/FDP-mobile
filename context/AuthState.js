import { useMemo, useReducer } from "react";
import { AuthContext } from "./context";
import { AuthReduser } from "./reducer";
import { CREATE_WALLET, GET_BALANCE, SIGN_IN, SIGN_OUT } from "./actions";

export const AuthState = (props) => {
  const initialState = {
    isLoading: true,
    isSignout: false,
    isAuth: false,
    userWallet: null,
    userBalance: 0
  };

  const [state, dispatch] = useReducer(AuthReduser, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        dispatch({ type: SIGN_IN, wallet: '0x000000000000000' });
      },
      signOut: () => dispatch({ type: SIGN_OUT }),
      signUp: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: SIGN_IN, wallet: '0x000000000000000' });
      },
      createWallet: async ()=> {
        dispatch({type: CREATE_WALLET, wallet: '0x000000000000000', balance: 0 })
      },
      getBalance: async ()=> {
        dispatch({type: GET_BALANCE, balance: 1})
      }
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        ...authContext
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
