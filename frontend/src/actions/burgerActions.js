import { BURGER_LIST_REQUEST, BURGER_LIST_SUCCESS,BURGER_LIST_FAIL,CREATE_BURGER_FAIL,CREATE_BURGER_REQUEST,CREATE_BURGER_SUCCESS,DELETE_BURGER_REQUEST,DELETE_BURGER_SUCCESS,DELETE_BURGER_FAIL,UPDATE_BURGER_REQUEST,UPDATE_BURGER_SUCCESS,UPDATE_BURGER_FAIL} from "../constants/burgerConstanta"
import { Navigate } from "react-router-dom"
import api from "../utils/axios"
export const listBurgers=(navigate)=>async(dispatch)=>{
try {
    dispatch({type:BURGER_LIST_REQUEST})
    const {data}=await api.get('/burgers')
    dispatch({type:BURGER_LIST_SUCCESS,payload:data})

} catch (error) {
    localStorage.clear()
    navigate('/signin')
    dispatch({type:BURGER_LIST_FAIL,payload:error.response&&error.response.data.message})
}
}
export const createBurger=(burgerdata,token,navigate)=>async(dispatch)=>{
try {
        dispatch({type:CREATE_BURGER_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            }
        }
        const {data}=await api.post('/burgers',{burgerdata},config)
        console.log(data)
        dispatch({type:CREATE_BURGER_SUCCESS,payload:data.burger })
        navigate('/')
} catch (error) {
    console.log(error.message)
    localStorage.clear()
    navigate('/signin')
    dispatch({type:CREATE_BURGER_FAIL,error:error.message})
    
}
}
export const deleteBurger=(id,navigate)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_BURGER_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            }
        }
        const {data}=await api.delete(`/burgers/${id}`,config)
        dispatch({type:DELETE_BURGER_SUCCESS,payload:{id,data}})
        console.log(data)
    } catch (error) {
        localStorage.clear()
        navigate('/signin')
        dispatch({type:DELETE_BURGER_FAIL,error:error.message})

    }

}

export const updateBurger=(burgerdata,id,navigate)=>async(dispatch)=>{
    try {
        
        dispatch({type:UPDATE_BURGER_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            }
        }
        const {data}=await api.put(`/burgers/${id}`,{burgerdata},config)
        dispatch({type:UPDATE_BURGER_SUCCESS,payload:data})
            console.log(data)
            navigate('/');
    
    } catch (error) {
        console.log(error.message)
        localStorage.clear()
        navigate('/signin')
        dispatch({type:UPDATE_BURGER_FAIL,error:error.message})
    }
}