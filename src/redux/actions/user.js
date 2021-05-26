import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from  '../constants/user'




export const registerUser = user => async dispatch =>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/users/create',user,config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const loginUser = user => async dispatch =>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/auth/signin',user,config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        sessionStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}


export const logoutUser = () => async dispatch=>{
    sessionStorage.removeItem('userInfo')

    dispatch({
        type: USER_LOGOUT
    })

    document.location.href = '/login'
}

export const detailsUser = params => async dispatch =>{
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/users/details/${params.userId}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const updateUser = (params, user) => async dispatch =>{
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })


        const {data} = await fetch(`/api/users/update/${params.userId}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json'
            },
            body:user
        })

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listUsers = () => async dispatch =>{
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {data} = await axios.get(`/api/users/list`)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}