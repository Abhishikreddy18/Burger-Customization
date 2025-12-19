import { ORDER_DETAILS_FAILURE,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,GET_ALL_ORDER_DETAILS_FAILURE,GET_ALL_ORDER_DETAILS_REQUEST,GET_ALL_ORDER_DETAILS_SUCCESS,ADMIN_ORDER_STATUS_UPDATE_REQUEST,ADMIN_ORDER_STATUS_UPDATE_SUCCESS,ADMIN_ORDER_STATUS_UPDATE_FAILURE  } from "../constants/orderConstants";
const initialState = {
    loading: false,
    orders: [],
    error: null
};

export const orderDetailsReducer = (state =initialState, action) => {

switch(action.type){
    case ORDER_DETAILS_REQUEST:
        return {loading:true}
    case ORDER_DETAILS_SUCCESS:
        return {loading:false,orders:action.payload}
    case ORDER_DETAILS_FAILURE:
        return {loading:false,error:action.payload}
    case GET_ALL_ORDER_DETAILS_REQUEST:
        return {loading:true}
    case GET_ALL_ORDER_DETAILS_SUCCESS:
        return {loading:false,orders:action.payload}
    case GET_ALL_ORDER_DETAILS_FAILURE:
        return {loading:false,error:action.payload}
        case ADMIN_ORDER_STATUS_UPDATE_REQUEST:
            return {
              ...state,
              loading: true,
            };
      
          case ADMIN_ORDER_STATUS_UPDATE_SUCCESS:
            return {
              ...state,
              loading: false,
              orders: state.orders.map(order =>
                order._id === action.payload._id
                  ?  action.payload 
                  : order
              ),
            };
      
          case ADMIN_ORDER_STATUS_UPDATE_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
    default:
        return state
}
}

