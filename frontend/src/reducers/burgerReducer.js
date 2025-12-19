import { BURGER_LIST_REQUEST, BURGER_LIST_SUCCESS,BURGER_LIST_FAIL,CREATE_BURGER_FAIL,CREATE_BURGER_REQUEST,CREATE_BURGER_SUCCESS,DELETE_BURGER_REQUEST,DELETE_BURGER_SUCCESS,DELETE_BURGER_FAIL} from "../constants/burgerConstanta"
export const burgerListReducer=(state={burgers:[]},action)=>{
switch(action.type){
    case BURGER_LIST_REQUEST:
        return{...state,loading:true}
    case BURGER_LIST_SUCCESS:
        return{...state,loading:false,burgers:action.payload}
    case BURGER_LIST_FAIL:
        return{...state,loading:false,error:action.payload}
        case CREATE_BURGER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                burgers: [...state.burgers, action.payload]
            };
        case CREATE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_BURGER_REQUEST:
            return {
               ...state,
                loading: true
            };
        case DELETE_BURGER_SUCCESS:
            return {
               ...state,
                loading: false,
                burgers: state.burgers.filter(burger => burger._id!== action.payload.id)
            };
        
        case DELETE_BURGER_FAIL:
            return {
               ...state,
                loading: false,
                error: action.payload
            };
    default:
        return state;
}
}