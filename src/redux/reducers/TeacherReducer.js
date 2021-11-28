import data from '../../data.json'
import { MainAPI } from '../../API.js'

let initialState = {
    cources: []
}

const TeacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state,
                cources: action.cources
            }
        }

        default:
            return state
    }
}
export default TeacherReducer

//action creator

export const Get_Data = (cources) => {
    return ({ type: GET_DATA, cources })
}


//thunk

export const Get_Data_Async =  () => async dispatch => {
    let response = await MainAPI.getCources()
    dispatch(Get_Data(response))
}

const GET_DATA = 'GET_DATA';

export const UpdateCourse = (id, course) => async () => {
    await MainAPI.updateCourse(id, course)
}

export const Add_Course_Async = (user_id, author, name) => async () => {
    await MainAPI.addCourse(user_id, author, name)
}

export const Delete_Course_Async = (id) => async () => {
    await MainAPI.deleteCourse(id)
}