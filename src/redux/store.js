import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

/*import {
    quizCheckReducer,
    quizCreateReducer,
    quizEnrollReducer,
    quizListReducer,
    quizRemoveReducer,
    quizStartReducer,
    quizUnenrollReducer,
    quizUpdateReducer,
    quizListEnrolledReducer,
    quizResetReducer,
    quizStudentResponseReducer,
    quizDetailsReducer,
    quizListByAuthorReducer,
    quizListStudentReducer
} from './reducers/quiz'*/

import {
    quizaCreateReducer,
    quizaListReducer,
    quizaRemoveReducer,
    quizaUpdateReducer,
    quizaDetailsReducer,
    quizaEnrollReducer,
    quizaMyEnrolledListReducer,
    quizaFinesReducer,
    quizaListByAuthorReducer,
    quizaCheckReducer,
    quizaResetReducer,
    quizaStartReducer,
    quizaResponsesReducer,
    quizaListMySubmissionsReducer,
    quizaSubmissionsListReducer
} from './reducers/quiza'

import {
    questionCreateReducer,
    questionListReducer,
    questionRemoveReducer,
    questionUpdateReducer
} from './reducers/question'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userListReducer,
    userUpdateReducer
} from './reducers/user'

const reducer = combineReducers({
    quizaCreate: quizaCreateReducer,
    quizaList: quizaListReducer,
    quizaRemove: quizaRemoveReducer,
    quizaUpdate:quizaUpdateReducer, 
    quizaDetails: quizaDetailsReducer,
    quizaEnroll: quizaEnrollReducer,
    quizaFines: quizaFinesReducer,
    quizaMyEnrolledList: quizaMyEnrolledListReducer,
    quizaListByAuthor: quizaListByAuthorReducer,
    quizaCheck: quizaCheckReducer,
    quizaReset: quizaResetReducer,
    quizaStart: quizaStartReducer,
    quizaResponses: quizaResponsesReducer,
    quizaListMySubmissions: quizaListMySubmissionsReducer,
    quizaSubmissionsList: quizaSubmissionsListReducer,
    questionCreate: questionCreateReducer,
    questionList: questionListReducer,
    questionRemove: questionRemoveReducer,
    questionUpdate: questionUpdateReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer
})

const userInfoFromStorage = sessionStorage.getItem('userInfo')
   ? JSON.parse(sessionStorage.getItem('userInfo'))
   : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;