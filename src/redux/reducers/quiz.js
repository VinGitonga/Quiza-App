import {
    QUIZ_CREATE_FAIL,
    QUIZ_CREATE_REQUEST,
    QUIZ_CREATE_RESET,
    QUIZ_CREATE_SUCCESS,
    QUIZ_LIST_FAIL,
    QUIZ_LIST_REQUEST,
    QUIZ_LIST_SUCCESS,
    QUIZ_REMOVE_FAIL,
    QUIZ_REMOVE_REQUEST,
    QUIZ_REMOVE_SUCCESS,
    QUIZ_UPDATE_FAIL,
    QUIZ_UPDATE_REQUEST,
    QUIZ_UPDATE_RESET,
    QUIZ_UPDATE_SUCCESS,
    QUIZ_START_REQUEST,
    QUIZ_START_FAIL,
    QUIZ_START_SUCCESS,
    QUIZ_CHECK_FAIL,
    QUIZ_CHECK_SUCCESS,
    QUIZ_CHECK_REQUEST,
    QUIZ_ENROLL_FAIL,
    QUIZ_ENROLL_REQUEST,
    QUIZ_ENROLL_SUCCESS,
    QUIZ_UNENROLL_FAIL,
    QUIZ_UNENROLL_REQUEST,
    QUIZ_UNENROLL_SUCCESS,
    QUIZ_LIST_ENROLLED_FAIL,
    QUIZ_LIST_ENROLLED_REQUEST,
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
    QUIZ_LIST_STUDENT_SUCCESS,
    QUIZ_LIST_STUDENT_REQUEST
} from '../constants/quiz'

export const quizCreateReducer = async(state={quiz:{}}, action)=>{
    switch(action.type){
        case QUIZ_CREATE_REQUEST:
            return {
                loading:true
            }
        case QUIZ_CREATE_SUCCESS:
            return {
                loading:false, quiz: action.payload, success:true
            }
        case QUIZ_CREATE_FAIL:
            return {
                loading:false, error: action.payload
            }
        case QUIZ_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const quizListReducer = async(state={quizzes:[]}, action)=>{
    switch(action.type){
        case QUIZ_LIST_REQUEST:
            return {
                loading:true
            }
        case QUIZ_LIST_SUCCESS:
            return {
                loading: false, quizzes: action.payload
            }
        case QUIZ_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizUpdateReducer = async(state={quiz:{}}, action)=>{
    switch(action.type){
        case QUIZ_UPDATE_REQUEST:
            return {
                loading:true
            }
        case QUIZ_UPDATE_SUCCESS:
            return {
                loading:false, success:true, quiz: action.payload
            }
        case QUIZ_UPDATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case  QUIZ_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const quizRemoveReducer = async(state={}, action)=>{
    switch(action.type){
        case QUIZ_REMOVE_REQUEST:
            return {
                loading: true
            }
        case QUIZ_REMOVE_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUIZ_REMOVE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizStartReducer = async(state={quiz:{}}, action)=>{
    switch(action.type){
        case QUIZ_START_REQUEST:
            return {
                loading: true
            }
        case QUIZ_START_SUCCESS:
            return {
                loading: false, success:true,quiz: action.payload
            }
        case QUIZ_START_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizCheckReducer = async(state={}, action)=>{
    switch(action.type){
        case QUIZ_CHECK_REQUEST:
            return {
                loading: true
            }
        case QUIZ_CHECK_SUCCESS:
            return {
                loading: false, success:true,
            }
        case QUIZ_CHECK_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizEnrollReducer = async(state={}, action)=>{
    switch(action.type){
        case QUIZ_ENROLL_REQUEST:
            return {
                loading: true
            }
        case QUIZ_ENROLL_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUIZ_ENROLL_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizUnenrollReducer = async(state={}, action)=>{
    switch(action.type){
        case QUIZ_UNENROLL_REQUEST:
            return {
                loading: true
            }
        case QUIZ_UNENROLL_SUCCESS:
            return {
                loading: false, success: true
            }
        case QUIZ_UNENROLL_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizListEnrolledReducer = async(state={quizzes:[]}, action)=>{
    switch(action.type){
        case QUIZ_LIST_ENROLLED_REQUEST:
            return {
                loading: true
            }
        case QUIZ_LIST_ENROLLED_SUCCESS:
            return {
                loading: false, quizzes: action.payload
            }
        case QUIZ_LIST_ENROLLED_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizResetReducer = async(state={}, action)=>{
    switch(action.type){
        case QUIZ_RESET_REQUEST:
            return {
                loading: true
            }
        case QUIZ_RESET_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUIZ_RESET_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizStudentResponseReducer = async(state={responses:{}}, action)=>{
    switch(action.type){
        case QUIZ_STUDENT_RESPONSE_REQUEST:
            return {
                loading: true
            }
        case QUIZ_STUDENT_RESPONSE_SUCCESS:
            return {
                loading: false, responses:action.payload,success:true
            }
        case QUIZ_STUDENT_RESPONSE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizDetailsReducer = async(state={quiz:{}}, action)=>{
    switch(action.type){
        case QUIZ_DETAILS_REQUEST:
            return {
                loading: true
            }
        case QUIZ_DETAILS_SUCCESS:
            return {
                loading: false, quiz: action.payload
            }
        case QUIZ_DETAILS_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizListByAuthorReducer = async(state={quizes:[]}, action)=>{
    switch(action.type){
        case QUIZ_LIST_BY_AUTHOR_REQUEST:
            return {
                loading: true
            }
        case QUIZ_LIST_BY_AUTHOR_SUCCESS:
            return {
                loading: false, quizes:action.payload
            }
        case QUIZ_LIST_BY_AUTHOR_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizListStudentReducer = async(state={quizes:[]}, action)=>{
    switch(action.type){
        case QUIZ_LIST_STUDENT_REQUEST:
            return {
                loading: true
            }
        case QUIZ_LIST_STUDENT_SUCCESS:
            return {
                loading: false, quizes: action.payload
            }
        case QUIZ_LIST_STUDENT_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}