import { useMemo, useReducer } from "react";
import { AuthContext } from "./context";
import { AuthReduser } from "./reducer";
import {
  CLEAR_AUTH,
  CREATE_WALLET,
  ERROR_AUTH,
  GET_BALANCE,
  PENDING_AUTH,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_WALLET,
} from "./actions";
import { FdpStorage } from "@fairdatasociety/fdp-storage";
import {
  Environments,
  getEnvironmentConfig,
} from "@fairdatasociety/fdp-contracts";
import * as SecureStore from "expo-secure-store";

export const fdp = new FdpStorage(
  "https://bee-test.bzzwiki.xyz/",
  "https://bee-debug-test.bzzwiki.xyz/",
  {
    ensOptions: {
      ...getEnvironmentConfig(Environments.LOCALHOST),
      rpcUrl: "https://chain-test.bzzwiki.xyz/",
      performChecks: true,
    },
  }
);

export const AuthState = (props) => {
  const initialState = {
    isLoading: true,
    isSignout: false,
    isAuth: false,
    userWallet: null,
    userBalance: 0,
    statusModalAuth: {isVisible: false, message: '', isError: false},
  };
  
  const [state, dispatch] = useReducer(AuthReduser, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async ({ username, password }) => {
        try {
          dispatch({type: PENDING_AUTH, message: 'Sign In...'})
          console.log(username, password);
          const wallet = await fdp.account.login(username, password);
          console.log(wallet);
          dispatch({ type: SIGN_IN, wallet: wallet.address});
          dispatch({type: CLEAR_AUTH})
        }catch(err) {
          console.log(err.message)
          dispatch({type: ERROR_AUTH, message: `Error! ${err.message}`})
        }
      },
      signOut: () => {
        dispatch({ type: SIGN_OUT });
      },
      signUp: async ({ username, password }) => {
        try {
          dispatch({type: PENDING_AUTH, message: 'Sign Up...'})
          console.log(username, password)
          const userMnemonic = await SecureStore.getItemAsync("mnemonic");
          console.log(userMnemonic, 'USER MNEMONIC');
          fdp.account.setAccountFromMnemonic(userMnemonic);
          await fdp.account.register(username, password);
          dispatch({type: PENDING_AUTH, message: 'Sign In...'});
          const wallet = await fdp.account.login(username, password);
          dispatch({ type: SIGN_IN, wallet: wallet.address});
          console.log(wallet, "CREATE WALLET");
          dispatch({type: CLEAR_AUTH});
        } catch (err) {
          dispatch({type: ERROR_AUTH, message: `Error! ${err.message}`});
        }
      },
      createWallet: async () => {
        try {
          dispatch({type: PENDING_AUTH, message: 'Create wallet...'});
          const wallet = await fdp.account.createWallet();
          dispatch({ type: CREATE_WALLET, wallet: wallet.address });
          console.log(wallet.mnemonic.phrase, "mnemonic");
          await SecureStore.setItemAsync("userWallet", wallet.address);
          await SecureStore.setItemAsync("mnemonic", wallet.mnemonic.phrase);
          dispatch({type: PENDING_AUTH, message: 'Check balance...'});
          const balance = await fdp.ens.provider.getBalance(wallet.address);
          dispatch({ type: GET_BALANCE, balance: Number(balance) });
          console.log(wallet.address, Number(balance), "createWallet");
          dispatch({type: CLEAR_AUTH});
        } catch (err) {
          dispatch({type: ERROR_AUTH, message: `Error! ${err.message}`})
        }
      },
      getBalance: async (wallet) => {
        try {
          dispatch({type: PENDING_AUTH, message: 'Check balance...'});
          const balance = await fdp.ens.provider.getBalance(wallet);
          console.log(Number(balance), "getBalance");
          dispatch({ type: GET_BALANCE, balance: Number(balance) });
          dispatch({type: CLEAR_AUTH});
        }catch(err){
          dispatch({type: ERROR_AUTH, message: `Error! ${err.message}`});
        }

      },
      updateWallet: (wallet) => {
        dispatch({ type: UPDATE_WALLET, wallet });
      },
      clearModal: ()=>{
        dispatch({type: CLEAR_AUTH});
      }
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        ...authContext,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
