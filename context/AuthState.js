import { useMemo, useReducer } from "react";
import { AuthContext } from "./context";
import { AuthReduser } from "./reducer";
import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "./actions";

export const AuthState = (props) => {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userWallet: null,
  };

  const [state, dispatch] = useReducer(AuthReduser, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log(data)

        dispatch({ type: SIGN_IN, token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: SIGN_OUT }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: SIGN_IN, token: 'dummy-auth-token' });
      },
      restoreToken: async()=>{
        dispatch({ type: RESTORE_TOKEN, token: userToken });
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
