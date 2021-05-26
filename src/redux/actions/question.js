import {
    QUESTION_REMOVE_FAIL,
    QUESTION_REMOVE_REQUEST,
    QUESTION_LIST_FAIL,
    QUESTION_LIST_REQUEST,
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_FAIL,
    QUESTION_LIST_SUCCESS,
    QUESTION_REMOVE_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_UPDATE_REQUEST,
    QUESTION_UPDATE_SUCCESS,
    QUESTION_CREATE_REQUEST
} from '../constants/question'
import axios from 'axios'


export const createQuestion = (params,question) => async dispatch =>{
    try {
        dispatch({
            type:QUESTION_CREATE_REQUEST
        })


        const config = {
            headers:{
                'Accept':'application/json'
            }
        }

        const {data} = await axios.post(`/api/questions/create/${params.quizaId}`,question,config)

        dispatch({
            type: QUESTION_CREATE_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: QUESTION_CREATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}


export const updateQuestion = (params, question) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUESTION_UPDATE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
                'Accept':'application/json'
            }
        }

        const {data} = await axios.put(`/api/questions/update/${params.questionId}`,question,config)

        dispatch({
            type: QUESTION_UPDATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUESTION_UPDATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listQuestions = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUESTION_LIST_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
                'Accept':'application/json'
            }
        }

        const {data} = await axios.get(`/api/questions/list/by/${params.quizaId}`,config)

        dispatch({
            type: QUESTION_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUESTION_LIST_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}


export const removeQuestion = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUESTION_REMOVE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
                'Accept':'application/json'
            }
        }

        await axios.delete(`/api/questions/delete/${params.questionId}`,config)

        dispatch({
            type: QUESTION_REMOVE_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUESTION_REMOVE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}