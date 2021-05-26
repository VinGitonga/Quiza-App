import axios from 'axios'
import {
    QUIZA_CREATE_FAIL,
    QUIZA_CREATE_REQUEST,
    QUIZA_CREATE_SUCCESS,
    QUIZA_LIST_FAIL,
    QUIZA_LIST_REQUEST,
    QUIZA_LIST_SUCCESS,
    QUIZA_REMOVE_FAIL,
    QUIZA_REMOVE_REQUEST,
    QUIZA_REMOVE_SUCCESS,
    QUIZA_UPDATE_FAIL,
    QUIZA_UPDATE_REQUEST,
    QUIZA_UPDATE_SUCCESS,
    QUIZA_DETAILS_FAIL,
    QUIZA_DETAILS_REQUEST,
    QUIZA_DETAILS_SUCCESS,
    QUIZA_ENROLL_FAIL,
    QUIZA_ENROLL_REQUEST,
    QUIZA_ENROLL_SUCCESS,
    QUIZA_MYENROLLED_LIST_FAIL,
    QUIZA_MYENROLLED_LIST_REQUEST,
    QUIZA_MYENROLLED_LIST_SUCCESS,
    QUIZA_FINES_FAIL,
    QUIZA_FINES_REQUEST,
    QUIZA_FINES_SUCCESS,
    QUIZA_LIST_BY_AUTHOR_FAIL,
    QUIZA_LIST_BY_AUTHOR_REQUEST,
    QUIZA_LIST_BY_AUTHOR_SUCCESS,
    QUIZA_CHECK_FAIL,
    QUIZA_CHECK_REQUEST,
    QUIZA_CHECK_SUCCESS,
    QUIZA_RESET_REQUEST,
    QUIZA_RESET_FAIL,
    QUIZA_RESET_SUCCESS,
    QUIZA_START_FAIL,
    QUIZA_START_REQUEST,
    QUIZA_START_SUCCESS,
    QUIZA_RESPONSES_FAIL,
    QUIZA_RESPONSES_REQUEST,
    QUIZA_RESPONSES_SUCCESS,
    QUIZA_LIST_MY_SUBMISSIONS_FAIL,
    QUIZA_LIST_MY_SUBMISSIONS_REQUEST,
    QUIZA_LIST_MY_SUBMISSIONS_SUCCESS,
    QUIZA_SUBMISSIONS_LIST_FAIL,
    QUIZA_SUBMISSIONS_LIST_REQUEST,
    QUIZA_SUBMISSIONS_LIST_SUCCESS
} from '../constants/quiza'

export const createQuiza = (params, quiza)=> async dispatch =>{
    try {
        dispatch({
            type: QUIZA_CREATE_REQUEST
        })

        const config = {
            headers:{
                'Accept':'application/json'
            }
        }

        const {data} = await axios.post(`/api/quizas/create/${params.userId}`, quiza, config)

        /*const {data} = await fetch(`/api/quizas/create/${params.userId}`,{
            method:'POST',
            headers:{
                'Accept':'application/json'
            },
            body:quiza
        })*/

        dispatch({
            type: QUIZA_CREATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_CREATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listQuizas = () => async dispatch=>{
    try {
        dispatch({
            type: QUIZA_LIST_REQUEST
        })

        const {data} = await axios.get('/api/quizas/list')

        /*const {data} = await fetch('/api/quizas/list',{
            method:'GET',
            signal:signal
        })*/

        dispatch({
            type: QUIZA_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_LIST_FAIL,
            payload: err.response && err.response.data.message
              ? err.response.data.message
              : err.message
        })
    }
}

export const updateQuiza = (params, quiza) => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_UPDATE_REQUEST
        })

        const {data} = await fetch(`/api/quizas/update/${params.quizaId}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json'
            },
            body:quiza
        })

        dispatch({
            type: QUIZA_UPDATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_UPDATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const removeQuiza = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_REMOVE_REQUEST
        })

        await axios.delete(`/api/quizas/${params.quizaId}`)

        dispatch({
            type: QUIZA_REMOVE_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUIZA_REMOVE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const detailsQuiza = params => async dispatch=>{
    try {
        dispatch({
            type: QUIZA_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/quizas/details/${params.quizaId}`)

        dispatch({
            type: QUIZA_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_DETAILS_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const enroll = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_ENROLL_REQUEST
        })

        await axios.patch(`/api/quizas/enroll/${params.quizaId}/by/${params.userId}`)

        dispatch({
            type: QUIZA_ENROLL_SUCCESS
        })

    } catch (err) {
        dispatch({
            type: QUIZA_ENROLL_FAIL,
            payload: err.response && err.response.data.message
              ? err.response.data.message
              : err.message
        })
    }
}

export const fines = (params,quiza) => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_FINES_REQUEST
        })

        const {data} = await axios.patch(`/api/quizas/unenroll/${params.userId}`,quiza)


        dispatch({
            type: QUIZA_FINES_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_FINES_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const myEnrolledQuizas = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_MYENROLLED_LIST_REQUEST
        })

        const {data} = await axios.get(`/api/quizas/myenrolled/by/${params.userId}`)

        dispatch({
            type: QUIZA_MYENROLLED_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_MYENROLLED_LIST_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listByAuthor = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_LIST_BY_AUTHOR_REQUEST
        })

        const {data} = await axios.get(`/api/quizas/list/by/${params.userId}`)

        dispatch({
            type: QUIZA_LIST_BY_AUTHOR_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_LIST_BY_AUTHOR_FAIL,
            payload: err.response && err.removeQuiza.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const startQuiza = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_START_REQUEST
        })

        const {data} =  await axios.patch(`/api/quizas/start/${params.quizaId}/by/${params.userId}`)

        dispatch({
            type: QUIZA_START_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_START_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const resetQuiza = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_RESET_REQUEST
        })

        await axios.patch(`/api/quizas/reset/by/${params.userId}`)

        dispatch({
            type: QUIZA_RESET_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUIZA_RESET_FAIL,
            payload: err.response && err.response.data.message
              ? err.response.data.message
              : err.message
        })
    }
}

export const checkQuiza = (params,data) => async dispatch=>{
    try {
        dispatch({
            type: QUIZA_CHECK_REQUEST
        })

        await axios.post(`/api/quizas/check/${params.quizaId}/by/${params.userId}`,data)

        dispatch({
            type: QUIZA_CHECK_SUCCESS
        })

    } catch (err) {
        dispatch({
            type: QUIZA_CHECK_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const responsesQuiza = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_RESPONSES_REQUEST
        })

        const {data} = await axios.get(`/api/quizas/responses/${params.quizaId}`)

        dispatch({
            type: QUIZA_RESPONSES_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_RESPONSES_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const mySubmissionsList = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_LIST_MY_SUBMISSIONS_REQUEST
        })

        const {data} = await axios.get(`/api/quizas/list/users/submissions/${params.userId}`)

        dispatch({
            type: QUIZA_LIST_MY_SUBMISSIONS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_LIST_MY_SUBMISSIONS_FAIL,
            payload: err.response && err.response.data.message
               ? err.responses.data.message
               : err.message
        })
    }
}

export const listQuizaSubmissions = params => async dispatch =>{
    try {
        dispatch({
            type: QUIZA_SUBMISSIONS_LIST_REQUEST
        })

        const {data} = await axios.get(`/api/quizas/list/quiza/submissions/${params.quizaId}`)

        dispatch({
            type: QUIZA_SUBMISSIONS_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZA_SUBMISSIONS_LIST_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}