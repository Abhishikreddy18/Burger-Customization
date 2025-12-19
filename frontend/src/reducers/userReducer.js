
import { LOGIN_FAILURE,LOGIN_REQUEST,LOGIN_SUCCESS, LOGOUT_SUCCESS,USER_FAILURE,USER_SUCCESS,USER_REQUEST,REGISTER_REQUEST,REGISTER_FAILURE,REGISTER_SUCCESS,GET_USERS_FAILURE,GET_USERS_REQUEST,GET_USERS_SUCCESS,UPDATE_USER_ROLE_REQUEST,UPDATE_USER_ROLE_SUCCESS,UPDATE_USER_ROLE_FAILURE,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAILURE  } from "../constants/userConstsants";


const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  const usersinitialState={
    loading: false,
    success: false,
    error: null,
    users: [],
  }
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true };
      case LOGIN_SUCCESS:
        return { ...state, loading: false, success: true, error: null,userInfo:action.payload };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT_SUCCESS:
        return {userInfo:{isAdmin:false}};
        case USER_REQUEST:
        return { ...state, loading: true };
      case USER_SUCCESS:
        return { ...state, loading: false, success: true, error: null, userInfo: action.payload };
      case USER_FAILURE:
        return { ...state, loading: false, success: false, error: action.payload };
        case REGISTER_REQUEST:
          return {...state,loading:true}
        case REGISTER_SUCCESS:
          return {...state,loading:false,success:true,error:null,userInfo:action.payload}
        case REGISTER_FAILURE:
          return {...state,loading:false,success:false,error:action.payload}
      default:
        return state;
    }
  };
  export const UserReducer=(state=usersinitialState,action) => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        return {...state,loading:true}
      case GET_USERS_SUCCESS:
        return {...state,loading:false,success:true,error:null,users:action.payload}
      case GET_USERS_FAILURE:
        return {...state,loading:false,success:false,error:action.payload}
        case UPDATE_USER_ROLE_REQUEST:
          return {
           ...state,
            loading: true,
          };
        case UPDATE_USER_ROLE_SUCCESS:
          return {
            loading: false,
            success: true,
            error: null,
            users: state.users.map(user =>
              user._id === action.payload._id
               ? action.payload
                : user
            ),
          };
        case UPDATE_USER_ROLE_FAILURE:
          return {
           ...state,
            loading: false,
            success: false,
            error: action.payload,
          };
          case DELETE_USER_REQUEST:
            return {
             ...state,
              loading: true,
            };
          case DELETE_USER_SUCCESS:
            return {
              loading: false,
              success: true,
              error: null,
              users: state.users.filter(user => user._id!== action.payload._id),
            };
          case DELETE_USER_FAILURE:
            return {
             ...state,
              loading: false,
              success: false,
              error: action.payload,
            };
      default:
        return state;
    }
  }
 