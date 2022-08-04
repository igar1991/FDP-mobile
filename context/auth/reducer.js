import { CLEAR_AUTH, CREATE_WALLET, ERROR_AUTH, GET_BALANCE, PENDING_AUTH, RESTORE_TOKEN, SIGN_IN, SIGN_OUT, UPDATE_WALLET } from "./actions";

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
        isAuth: false
      };
    case CREATE_WALLET:
      return {
        ...state,
        userWallet: action.wallet,
      };
    case GET_BALANCE:
      return {
        ...state,
        userBalance: action.balance
      };
    case UPDATE_WALLET:
      return {
        ...state,
        userWallet: action.wallet
      };
    case PENDING_AUTH:
      return {
        ...state,
        statusModalAuth: {isVisible: true, message: action.message, isError: false}
      };
    case ERROR_AUTH:
      return {
        ...state,
        statusModalAuth: {isVisible: true, message: action.message, isError: true}
      };
    case CLEAR_AUTH:
      return {
        ...state,
        statusModalAuth: {isVisible: false, message: '', isError: false}
      }            
    default:
      return state;
  }
};
