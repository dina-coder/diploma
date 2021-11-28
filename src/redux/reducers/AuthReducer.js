import { MainAPI } from '../../API.js'
let initialState = {
    name: null,
    user_id: null,
    role: '',
    isAuth: false,
    isError: false,
    progress: []
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TEACHER: {
            return { ...state, ...action.payload }
        }
        case SET_AUTH_STUDENT: {
            return { ...state, ...action.payload }
        }
        case SET_LOGIN_OUT: {
            return { ...state, name: null, user_id: null, role: null, progress: [], isAuth: false, isError:false }

        }
        case SET_ERROR: {
            return { ...state, isError: true }
        }
        case GET_PROGRESS: {
            return {
                ...state,
                progress: action.progress
            }
        }

        default:
            return state
    }
}
export default AuthReducer

const SET_AUTH_TEACHER = 'SET_AUTH_USER'
const SET_AUTH_STUDENT = 'SET_AUTH_USER'
const SET_LOGIN_OUT = 'SET_LOGIN_OUT'
const SET_ERROR = 'SET_ERROR'
const GET_PROGRESS = 'GET_PROGRESS';

export const SetAuthCreation = (name, user_id, role, isAuth) => {
    return ({ type: SET_AUTH_TEACHER, payload: { name, user_id, role, isAuth } });
}

export const SetStudentAuthCreation = (name, user_id, role, progress, isAuth) => {
    return ({ type: SET_AUTH_STUDENT, payload: { name, user_id, role, isAuth } });
}

export const SetLogOut = () => {
    return ({ type: SET_LOGIN_OUT })
}

export const SetError = () => {
    return ({ type: SET_ERROR })
}

export const login = (email, password) =>
    async (dispatch) => {
        try{
            let response = await MainAPI.login(email, password);
        
            if (response.status === 'teacher') {
                dispatch(SetAuthCreation(response.name, response._id, response.status, true))
            }
            else {
                dispatch(SetStudentAuthCreation(response.name, response._id, response.status, response.progress, true))
            }
        }
    catch{
        dispatch(SetError());
    }
        
    }

export const Get_Progress = (progress) => {
    return ({ type: GET_PROGRESS, progress})
}

export const Get_Progress_Async = (id) => async dispatch => {
    console.log(id)
    let response = await MainAPI.getProgress(id)
    dispatch(Get_Progress(response))
    console.log(id)
}

export const Set_Progress_Async = (user_id, progress) => async () => {
    await MainAPI.setProgress(user_id, progress);
}

