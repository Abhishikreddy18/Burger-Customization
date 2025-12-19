import { ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE,GET_ALL_ORDER_DETAILS_FAILURE,GET_ALL_ORDER_DETAILS_REQUEST,GET_ALL_ORDER_DETAILS_SUCCESS,ADMIN_ORDER_STATUS_UPDATE_FAILURE,ADMIN_ORDER_STATUS_UPDATE_SUCCESS,ADMIN_ORDER_STATUS_UPDATE_REQUEST } from "../constants/orderConstants";
import api from "../utils/axios";

export const getOrders = (userId, navigate, token) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        if (!token) {
            throw new Error("No token provided");
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await api.get(`/api/order?userId=${userId}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

    } catch (error) { 
        localStorage.clear()
        navigate('/signin')
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.message
        });  
    } 
}; 
export const getallOrders=(navigate, token)=>async(dispatch)=>{
try {
    dispatch({type:GET_ALL_ORDER_DETAILS_REQUEST})
    if (!token) {
        throw new Error("No token provided");
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await api.get(`/api/admin/orders`, config);
    dispatch({ type: GET_ALL_ORDER_DETAILS_SUCCESS, payload: data });
    navigate('/admin-orders')
} catch (error) {
    //localStorage.clear()
    //navigate('/signin')
    dispatch({
        type: GET_ALL_ORDER_DETAILS_FAILURE,
        payload: error.message
    });
}
}
export const UpdateOrder = (id, isDelivered, token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_STATUS_UPDATE_REQUEST });
        console.log(token)
        if (!token) {
            throw new Error("No token provided");
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await api.post(`/api/admin/orders/${id}`, { isDelivered }, config);
        console.log(data)
        dispatch({ type: ADMIN_ORDER_STATUS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_STATUS_UPDATE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};