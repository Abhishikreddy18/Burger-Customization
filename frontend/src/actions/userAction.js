import api from '../utils/axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT_SUCCESS,USER_SUCCESS,USER_FAILURE,REGISTER_REQUEST,REGISTER_FAILURE,REGISTER_SUCCESS, USER_REQUEST,SAVE_SHIPPING_ADDRESS,GET_USERS_REQUEST,GET_USERS_FAILURE,GET_USERS_SUCCESS,UPDATE_USER_ROLE_REQUEST,UPDATE_USER_ROLE_SUCCESS,UPDATE_USER_ROLE_FAILURE,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAILURE } from '../constants/userConstsants';
export const registerHandler = (name,user,pwd) =>async(dispatch)=>{
  try {
    dispatch({type:REGISTER_REQUEST})
    const { data } = await api.post('/api/users/register', { name, email: user, password: pwd }, { headers: { 'Content-Type': 'application/json' } });
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem("token", data.token); 
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload:error.message,
    });
  }


}
//login
export const loginHandler = ({ user, pwd }) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await api.post('/api/users/login', { email: user, password: pwd }, { headers: { 'Content-Type': 'application/json' } });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem("token", data.token);
  } catch (error) {
    let errorMsg = 'Login Failed';
    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 400) {
        errorMsg = error.response.data.message || 'Email and password are required';
      } else if (error.response.status === 401) {
        errorMsg = error.response.data.message || 'Invalid email or password';
      } else if (error.response.status === 500) {
        errorMsg = error.response.data.message || 'Server error';
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMsg = 'No Server Response';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMsg = error.message;
    }
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMsg,
    });
  }
};
export const logouthandler=(navigate)=>async(dispatch)=>{
    localStorage.clear()
    dispatch({
        type: LOGOUT_SUCCESS,
    })
    navigate('/')
}
export const getCurrentUser = (id,token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST });
    const { data } = await api.get(`api/users/profile/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(data,'usersucces');
    dispatch({
      type: USER_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem("token", data.token);
  } catch (error) {
    localStorage.clear();
    navigate('/signin');
    dispatch({
      type: USER_FAILURE,
      payload: error.message,
    });
    console.log(error.message);
  }
};
export const getallUsers=(token)=>async(dispatch)=>{
  try {
    dispatch({type:GET_USERS_REQUEST})
    console.log(token);
    const config={
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const { data } = await api.get('/api/users/allusers',config)
    dispatch({type:GET_USERS_SUCCESS,payload:data})

    
  } catch (error) {
    dispatch({type:GET_USERS_FAILURE,payload:error.message})
  }
}
export const updateUserRole=(id, isEmployee,token)=>async(dispatch)=>{
  try {
    dispatch({type:UPDATE_USER_ROLE_REQUEST})
    console.log(token);
    const config={
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const { data } = await api.put(`/api/users/role/${id}`,{isEmployee},config)
    dispatch({type:UPDATE_USER_ROLE_SUCCESS,payload:data.user})

    
  } catch (error) {
    dispatch({type:UPDATE_USER_ROLE_FAILURE,payload:error.message})
  }
}
export const deleteUser=(id,token)=>async(dispatch)=>{
try {
  dispatch({type:DELETE_USER_REQUEST})
  const config={
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  const { data } = await api.delete(`/api/users/delete/${id}`,config)
console.log(data.user)
  dispatch({type:DELETE_USER_SUCCESS,payload:data.user})
} catch (error) {
  console.log(error.message)
  dispatch({type:DELETE_USER_FAILURE,payload:error.message})
  
}
}