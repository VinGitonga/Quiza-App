import {
    QUESTION_CREATE_FAIL,
    QUESTION_CREATE_REQUEST,
    QUESTION_CREATE_RESET,
    QUESTION_CREATE_SUCCESS,
    QUESTION_LIST_FAIL,
    QUESTION_LIST_REQUEST,
    QUESTION_LIST_SUCCESS,
    QUESTION_REMOVE_FAIL,
    QUESTION_REMOVE_REQUEST,
    QUESTION_REMOVE_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_UPDATE_REQUEST,
    QUESTION_UPDATE_RESET,
    QUESTION_UPDATE_SUCCESS
} from '../constants/question'

export const questionCreateReducer = (state={}, action)=>{
    switch(action.type){
        case QUESTION_CREATE_REQUEST:
            return {
                loading:true
            }
        case QUESTION_CREATE_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUESTION_CREATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case QUESTION_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const questionListReducer = (state={questions:[]}, action)=>{
    switch(action.type){
        case QUESTION_LIST_REQUEST:
            return {
                loading: true
            }
        case QUESTION_LIST_SUCCESS:
            return {
                loading: false, questions: action.payload
            }
        case QUESTION_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const questionUpdateReducer = (state={question:{}}, action)=>{
    switch(action.type){
        case QUESTION_UPDATE_REQUEST:
            return {
                loading: true
            }
        case QUESTION_UPDATE_SUCCESS:
            return {
                loading: false, success:true, question: action.payload
            }
        case QUESTION_UPDATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case QUESTION_UPDATE_RESET:
            return {
                question:{}
            }
        default:
            return state
    }
}


export const questionRemoveReducer = (state={}, action)=>{
    switch(action.type){
        case QUESTION_REMOVE_REQUEST:
            return {
                loading: true
            }
        case QUESTION_REMOVE_SUCCESS:
            return {
                loading: false, success:true
            }
        case QUESTION_REMOVE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}