import { ADD_TO_CART,REMOVE_CART,SAVE_SHIPPING_ADDRESS,PAYMENT_METHOD, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,DELETE_ALL_CART } from "../constants/cartConstants";
export const cartReducer=(state={cartItems:[]},action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item=action.payload;
            console.log(item);
            const existItem=state.cartItems.find(x=>x.id===item.id);
            if(existItem){
                return{
                   ...state,
                    cartItems:state.cartItems.map(x=>x.id===item.id?item:x)
                }
            }else{
                return{
                   ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
            case REMOVE_CART:
                
                return{
                   ...state,
                    cartItems:state.cartItems.filter(x=>x.id!==action.payload.id)
                }
                case DELETE_ALL_CART:
                    return{
                       ...state,
                        cartItems:[]
                    }
            case SAVE_SHIPPING_ADDRESS:
                return{
                   ...state,
                    shippingAddress:action.payload
                }
            case PAYMENT_METHOD:
                return{
                   ...state,
                    paymentMethod:action.payload
                }
             case CREATE_ORDER_REQUEST:
                return{
                   ...state,
                 loading:true
                }
                case CREATE_ORDER_SUCCESS:
                    return{
                       ...state,
                        loading:false,
                        success:true,
                        order:action.payload
                    }
                case CREATE_ORDER_FAILURE:
                    return{
                       ...state,
                        loading:false,
                        error:action.payload
                    }
        default:
            return state;
    }

}
