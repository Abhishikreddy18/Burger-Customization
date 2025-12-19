import { Navigate } from "react-router-dom";
import { ADD_TO_CART,REMOVE_CART,SAVE_SHIPPING_ADDRESS,PAYMENT_METHOD,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAILURE,DELETE_ALL_CART} from "../constants/cartConstants";
import api from "../utils/axios";

// Correctly use getState to access Redux state
export const addtocart = (id, quantity,  selectedIngredients,totalPrice) => async (dispatch, getState) => {
    const { burgers } = getState().burgerList; // Access the burgers state using getState
    const foundBurger = burgers.find(burger => burger._id === id); // Find the burger by id
    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: id,
            burger: foundBurger,
            quantity: quantity,
            totalPrice: totalPrice,
        selectedIngredients: selectedIngredients,
        }
    });
    // Persist the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};
export const removecart=(id)=> async(dispatch,getState)=>{
    dispatch({
        type: REMOVE_CART,
        payload: {id: id},
    });
    // Persist the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}
export const saveshippingaddress=(data)=>async(dispatch,getState)=>{
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data
    });
    // Persist the updated cart to localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}
export const paymentmethod=(data)=>async(dispatch)=>{
    dispatch({
        type: PAYMENT_METHOD,
        payload: data
    })
}
export const createorder=(token,orderdata,navigate)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:CREATE_ORDER_REQUEST
        })
        const {data}=await api.post('/api/order',orderdata, { headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }})
          dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })
        navigate('/orders')
        localStorage.removeItem('cart')
        dispatch({
            type:DELETE_ALL_CART
        })
    } catch (error) {
        navigate('/cart')
        dispatch({
            type:CREATE_ORDER_FAILURE,
            payload:error.response && error.response.data.message? error.response.data.message : error.message
        })
    }
}