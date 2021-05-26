import {
    QUIZA_CREATE_FAIL,
    QUIZA_CREATE_REQUEST,
    QUIZA_CREATE_RESET,
    QUIZA_CREATE_SUCCESS,
    QUIZA_LIST_FAIL,
    QUIZA_LIST_REQUEST,
    QUIZA_LIST_SUCCESS,
    QUIZA_REMOVE_FAIL,
    QUIZA_REMOVE_REQUEST,
    QUIZA_REMOVE_SUCCESS,
    QUIZA_UPDATE_FAIL,
    QUIZA_UPDATE_REQUEST,
    QUIZA_UPDATE_RESET,
    QUIZA_UPDATE_SUCCESS,
    QUIZA_DETAILS_REQUEST,
    QUIZA_DETAILS_FAIL,
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
    QUIZA_START_REQUEST,
    QUIZA_START_SUCCESS,
    QUIZA_START_FAIL,
    QUIZA_CHECK_FAIL,
    QUIZA_CHECK_REQUEST,
    QUIZA_CHECK_SUCCESS,
    QUIZA_RESET_FAIL,
    QUIZA_RESET_REQUEST,
    QUIZA_RESET_SUCCESS,
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

export const quizaCreateReducer = (state={}, action)=>{
    switch(action.type){
        case QUIZA_CREATE_REQUEST:
            return {
                loading: true
            }
        case QUIZA_CREATE_SUCCESS:
            return {
                loading: false, success: true, quiza: action.payload
            }
        case QUIZA_CREATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case QUIZA_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const quizaListReducer = (state={quizas:[]}, action)=>{
    switch(action.type){
        case QUIZA_LIST_REQUEST:
            return {
                loading: true
            }
        case QUIZA_LIST_SUCCESS:
            return {
                loading: false, quizas:action.payload
            }
        case QUIZA_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaUpdateReducer = (state={quiza:{}}, action)=>{
    switch(action.type){
        case QUIZA_UPDATE_REQUEST:
            return {
                loading: true
            }
        case QUIZA_UPDATE_SUCCESS:
            return {
                loading: false, success: true, quiza: action.payload
            }
        case QUIZA_UPDATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case QUIZA_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const quizaRemoveReducer = (state={}, action)=>{
    switch(action.type){
        case QUIZA_REMOVE_REQUEST:
            return {
                loading: true
            }
        case QUIZA_REMOVE_SUCCESS:
            return {
                loading: false, success: true
            }
        case QUIZA_REMOVE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaDetailsReducer = (state={quiza:{}}, action)=>{
    switch(action.type){
        case QUIZA_DETAILS_REQUEST:
            return {
                loading: true
            }
        case QUIZA_DETAILS_SUCCESS:
            return {
                loading: false, quiza: action.payload
            }
        case QUIZA_DETAILS_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaEnrollReducer = (state={}, action)=>{
    switch(action.type){
        case QUIZA_ENROLL_REQUEST:
            return {
                loading: true
            }
        case QUIZA_ENROLL_SUCCESS:
            return {
                loading: false, success: true
            }
        case QUIZA_ENROLL_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaFinesReducer = (state={}, action)=>{
    switch(action.type){
        case QUIZA_FINES_REQUEST:
            return {
                loading: true
            }
        case QUIZA_FINES_SUCCESS:
            return {
                loading: false, success: true
            }
        case QUIZA_FINES_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaMyEnrolledListReducer = (state={quizas:[]}, action)=>{
    switch(action.type){
        case QUIZA_MYENROLLED_LIST_REQUEST:
            return {
                loading: true
            }
        case QUIZA_MYENROLLED_LIST_SUCCESS:
            return {
                loading: false, quizas: action.payload
            }
        case QUIZA_MYENROLLED_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaListByAuthorReducer = (state={quizas:[]},action)=>{
    switch(action.type){
        case QUIZA_LIST_BY_AUTHOR_REQUEST:
            return {
                loading: true
            }
        case QUIZA_LIST_BY_AUTHOR_SUCCESS:
            return {
                loading: false, quizas: action.payload
            }
        case QUIZA_LIST_BY_AUTHOR_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaStartReducer = (state={quizaData:{}}, action)=>{
    switch(action.type){
        case QUIZA_START_REQUEST:
            return {
                loading: true
            }
        case QUIZA_START_SUCCESS:
            return {
                loading: false, success: true,
                quizaData: action.payload.data,quizaDuration: action.payload.duration,
                quizaStatus: action.payload.status
            }
        case QUIZA_START_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaResetReducer = (state={}, action)=>{
    switch(action.type){
        case QUIZA_RESET_REQUEST:
            return {
                loading: true
            }
        case QUIZA_RESET_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUIZA_RESET_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaCheckReducer = (state={}, action)=>{
    switch(action.type){
        case QUIZA_CHECK_REQUEST:
            return {
                loading: true
            }
        case QUIZA_CHECK_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUIZA_CHECK_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaResponsesReducer = (state={attemptInfo:{}}, action)=>{
    switch(action.type){
        case QUIZA_RESPONSES_REQUEST:
            return {
                loading: true
            }
        case QUIZA_RESPONSES_SUCCESS:
            return {
                loading: false, attemptInfo:action.payload
            }
        case QUIZA_RESPONSES_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaSubmissionsListReducer = (state={usersResults:[]}, action)=>{
    switch(action.type){
        case QUIZA_SUBMISSIONS_LIST_REQUEST:
            return {
                loading: true
            }
        case QUIZA_SUBMISSIONS_LIST_SUCCESS:
            return {
                loading: false, usersResults: action.payload
            }
        case QUIZA_SUBMISSIONS_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const quizaListMySubmissionsReducer = (state={quizas:[]}, action)=>{
    switch(action.type){
        case QUIZA_LIST_MY_SUBMISSIONS_REQUEST:
            return {
                loading: true
            }
        case QUIZA_LIST_MY_SUBMISSIONS_SUCCESS:
            return {
                loading: false, quizas:action.payload
            }
        case QUIZA_LIST_MY_SUBMISSIONS_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}