import { CREATE_WALLET, GET_BALANCE, RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from "./actions";

export const AuthReduser = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userWallet: action.wallet,
        isAuth: true
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userWallet: null,
        isAuth: false
      };
    case CREATE_WALLET:
      return {
        ...state,
        userWallet: action.wallet,
        userBalance: action.balance
      };
    case GET_BALANCE:
      return {
        ...state,
        userBalance: action.balance
      }   
    default:
      return state;
  }
};
