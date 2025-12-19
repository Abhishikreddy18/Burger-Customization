import { GET_INGREDIENTS_REQUEST,GET_INGREDIENTS_SUCCESS,GET_INGREDIENTS_FAILURE,DElETE_INGREDIENT_REQUEST,DElETE_INGREDIENT_SUCCESS,DElETE_INGREDIENT_FAILURE,CREATE_INGREDIENT_REQUEST,CREATE_INGREDIENT_SUCCESS,CREATE_INGREDIENT_FAILURE,UPDATE_INGREDIENT_FAILURE,UPDATE_INGREDIENT_SUCCESS,UPDATE_INGREDIENT_REQUEST } from "../constants/ingredientsConstants";
import api from "../utils/axios";
import { deleteBurger } from './burgerActions';
export const getingredients=()=>async(dispatch)=>{
try {
    dispatch({type:GET_INGREDIENTS_REQUEST})
    const config = {
        headers: {
            'Content-Type': 'application/json',

        },
    }
    const { data } = await api.get('/api/ingredients',config)
    dispatch({type:GET_INGREDIENTS_SUCCESS,payload:data})
} catch (error) {
        dispatch({type:GET_INGREDIENTS_FAILURE,payload:error.message})
    
}
}
export const deleteingredients=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DElETE_INGREDIENT_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',}}
                const { data } = await api.delete(`/api/ingredients/${id}`,config)
                dispatch({type:DElETE_INGREDIENT_SUCCESS,payload:data.ingredient})
            }catch(error)
            {
                dispatch({type:DElETE_INGREDIENT_FAILURE,payload:error.message})
                
            }
}
export const createingredient=({name,price},navigate,handleClose)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_INGREDIENT_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',}}
                
                const { data } = await api.post(`/api/ingredients`,{name,price},config)
                console.log(data)
                dispatch({type:CREATE_INGREDIENT_SUCCESS,payload:data.ingredient})
                navigate('/')
                handleClose();
            }catch(error)
            {
                navigate('/')
                dispatch({type:CREATE_INGREDIENT_FAILURE,payload:error.message})
                
            }
}
export const updateingredient=({id,name,price},navigate,handleClose)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_INGREDIENT_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',}}
                
                const { data } = await api.put(`/api/ingredients`,{id,name,price},config)
                console.log(data)
                dispatch({type:UPDATE_INGREDIENT_SUCCESS,payload:data.ingredient})
                navigate('/')
                handleClose();
            }catch(error)
            {
                dispatch({type:UPDATE_INGREDIENT_FAILURE,payload:error.message})
                
            }
}