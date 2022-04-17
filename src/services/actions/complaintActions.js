import {
    ADD_COMPLAINT_REQUEST,
    ADD_COMPLAINT_SUCCESS,
    ADD_COMPLAINT_FAIL,
    ALL_COMPLAINT_REQUEST,
    ALL_COMPLAINT_SUCCESS,
    ALL_COMPLAINT_FAIL,
    COMPLAINT_DCO_APPROVE_REQUEST,
    COMPLAINT_DCO_APPROVE_SUCCESS,
    COMPLAINT_DCO_APRROVE_FAIL,
    COMPLAINT_DCO_REJECT_REQUEST,
    COMPLAINT_DCO_REJECT_SUCCESS,
    COMPLAINT_DCO_REJECT_FAIL
} from '../constants/complaintConstants'
import axios from 'axios'

export const addComplaint = (Data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_COMPLAINT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post('/complaint', Data, config)

        dispatch({
            type: ADD_COMPLAINT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_COMPLAINT_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const allComplaintAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_COMPLAINT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        }


        const { data } = await axios.get('/complaint', config)

        dispatch({
            type: ALL_COMPLAINT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_COMPLAINT_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const complaintApproveByDco = (_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COMPLAINT_DCO_APPROVE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post('/complaint/approvedByDco', { _id }, config)

        dispatch({
            type: COMPLAINT_DCO_APPROVE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: COMPLAINT_DCO_APRROVE_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const complaintRejectByDco = (_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COMPLAINT_DCO_REJECT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post('/complaint/rejectedByDco', { _id }, config)

        dispatch({
            type: COMPLAINT_DCO_REJECT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: COMPLAINT_DCO_REJECT_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
