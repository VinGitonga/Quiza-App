import {
    QUIZ_CHECK_REQUEST,
    QUIZ_CHECK_FAIL,
    QUIZ_CHECK_SUCCESS,
    QUIZ_CREATE_FAIL,
    QUIZ_CREATE_REQUEST,
    QUIZ_CREATE_SUCCESS,
    QUIZ_UPDATE_FAIL,
    QUIZ_UPDATE_REQUEST,
    QUIZ_UPDATE_SUCCESS,
    QUIZ_START_SUCCESS,
    QUIZ_START_FAIL,
    QUIZ_START_REQUEST,
    QUIZ_LIST_FAIL,
    QUIZ_LIST_REQUEST,
    QUIZ_LIST_SUCCESS,
    QUIZ_REMOVE_FAIL,
    QUIZ_REMOVE_REQUEST,
    QUIZ_REMOVE_SUCCESS,
    QUIZ_ENROLL_REQUEST,
    QUIZ_ENROLL_SUCCESS,
    QUIZ_ENROLL_FAIL,
    QUIZ_UNENROLL_FAIL,
    QUIZ_UNENROLL_REQUEST,
    QUIZ_UNENROLL_SUCCESS,
    QUIZ_LIST_ENROLLED_REQUEST,
    QUIZ_LIST_ENROLLED_FAIL,
    QUIZ_LIST_ENROLLED_SUCCESS,
    QUIZ_RESET_FAIL,
    QUIZ_RESET_REQUEST,
    QUIZ_RESET_SUCCESS,
    QUIZ_STUDENT_RESPONSE_FAIL,
    QUIZ_STUDENT_RESPONSE_REQUEST,
    QUIZ_STUDENT_RESPONSE_SUCCESS,
    QUIZ_DETAILS_REQUEST,
    QUIZ_DETAILS_SUCCESS,
    QUIZ_DETAILS_FAIL,
    QUIZ_LIST_BY_AUTHOR_FAIL,
    QUIZ_LIST_BY_AUTHOR_REQUEST,
    QUIZ_LIST_BY_AUTHOR_SUCCESS,
    QUIZ_LIST_STUDENT_FAIL,
    QUIZ_LIST_STUDENT_REQUEST,
    QUIZ_LIST_STUDENT_SUCCESS
} from '../constants/quiz'
import axios from 'axios'

export const createQuiz = (quiz) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_CREATE_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        /*const config = {
            header:{
                Authorization:`Bearer ${userInfo.token}`,
                'Content-Type':'application/json'
            }
        }**/

        //const {data} = await axios.post('/api/exams/save',quiz,config)
        const {result} = await fetch('/api/exams/create',{
            method:'POST',
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
                'Accept':'application/json'
            },
            body:quiz
        })


        dispatch({
            type: QUIZ_CREATE_SUCCESS,
            payload: result
        })
    } catch (err) {
        dispatch({
            type: QUIZ_CREATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const updateQuiz = (params, quiz)=> async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_UPDATE_REQUEST,
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

        const {data} = await axios.put(`/api/quizes/update/${params.quizId}`,quiz,config)
        dispatch({
            type: QUIZ_UPDATE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_UPDATE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listQuizzes = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_LIST_REQUEST
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

        const {data} = await axios.get(`/api/exams/list`,config)

        dispatch({
            typeL: QUIZ_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type:QUIZ_LIST_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const removeQuiz = (params) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_REMOVE_REQUEST,
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

        await axios.delete(`/api/quizes/${params.quizId}`,config)
        
        dispatch({
            type: QUIZ_REMOVE_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUIZ_REMOVE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const startQuiz = params => async(dispatch,getState)=>{
    try {
        dispatch({
            type: QUIZ_START_REQUEST
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

        const {data} = await axios.patch(`/api/exams/start/${params.quizId}/by/${params.userId}`,config)

        dispatch({
            type: QUIZ_START_SUCCESS,
            payload:data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_START_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const enrollToQuiz = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_ENROLL_REQUEST
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

        await axios.patch(`/api/exams/enroll/${params.quizId}/by/${params.userId}`,config)

        dispatch({
            type: QUIZ_ENROLL_SUCCESS
        })
    } catch (err) {
        dispatch({
            type:QUIZ_ENROLL_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const unenrollFromQuiz = params =>async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_UNENROLL_REQUEST
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

        await axios.patch(`/api/quizes/unenroll/${params.quizId}`,config)
        
        dispatch({
            type: QUIZ_UNENROLL_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUIZ_UNENROLL_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const checkQuiz = (params, quiz) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_CHECK_REQUEST
        })

        const {
            userLogin:{userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/quizes/check/${params.quizId}`,quiz,config)

        dispatch({
            type: QUIZ_CHECK_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUIZ_CHECK_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listQuizzesEnrolled = (params) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_LIST_ENROLLED_REQUEST
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

        const {data} = await axios.get(`/api/exams/list/enrolled/${params.userId}`, config)

        dispatch({
            type:QUIZ_LIST_ENROLLED_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_LIST_ENROLLED_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const resetQuiz = (params)=> async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_RESET_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
                'Accept':'application/json'
            }
        }

        await axios.patch(`/api/quizes/reset/${params.userId}`,config)

        dispatch({
            type: QUIZ_RESET_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: QUIZ_RESET_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const responseQuiz = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_STUDENT_RESPONSE_REQUEST
        })

        const {
            userLogin:{userInfo}
        }= getState()

        const config= {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
                'Accept':'application/json'
            }
        }

        const {data} = await axios.get(`/api/quizes/responses/student/${params.quizId}`,config)

        dispatch({
            type: QUIZ_STUDENT_RESPONSE_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_STUDENT_RESPONSE_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const detailsQuiz = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_DETAILS_REQUEST
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

        const {data} = await axios.get(`/api/exams/details/${params.quizId}`,config)

        dispatch({
            type: QUIZ_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_DETAILS_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listByAuthorQuiz = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_LIST_BY_AUTHOR_REQUEST
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

        const {data} = await axios.get(`/api/exams/list/author/quizes/${params.userId}`,config)

        dispatch({
            type: QUIZ_LIST_BY_AUTHOR_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_LIST_BY_AUTHOR_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}

export const listStudentQuiz = params => async(dispatch, getState)=>{
    try {
        dispatch({
            type: QUIZ_LIST_STUDENT_REQUEST
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

        const {data} = await axios.get(`/api/exams/list/student/quizes/${params.userId}`,config)

        dispatch({
            type: QUIZ_LIST_STUDENT_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: QUIZ_LIST_STUDENT_FAIL,
            payload: err.response && err.response.data.message
               ? err.response.data.message
               : err.message
        })
    }
}