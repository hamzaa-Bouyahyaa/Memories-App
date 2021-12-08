import * as api from '../api';
import { AUTH, AUTHERROR } from '../constants/actionTypes'


export const signin = (formData, navigate) => async (dispatch) => {
    try {
        await api.signIn(formData).then((res) => dispatch({ type: AUTH, data: res.data }))
        navigate('/')
    } catch (error) {
        dispatch(autherror(error.response.data.message))
    }

}


export const signup = (formData, navigate) => async (dispatch) => {
    try {
        await api.signUp(formData).then((res) => dispatch({ type: AUTH, data: res.data }))

        navigate('/')

    } catch (error) {
        dispatch(autherror(error.response.data.message))

    }

}

export const autherror = (error) => async (dispatch) => {
    dispatch({ type: AUTHERROR, payload: error })
}