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

export const addComplaintReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMPLAINT_REQUEST:
            return { loading: true }
        case ADD_COMPLAINT_SUCCESS:
            return { loading: false, result: action.payload }
        case ADD_COMPLAINT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const allComplaintReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_COMPLAINT_REQUEST:
            return { loading: true }
        case ALL_COMPLAINT_SUCCESS:
            return { loading: false, complaints: action.payload }
        case ALL_COMPLAINT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const complaintApproveByDcoReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPLAINT_DCO_APPROVE_REQUEST:
            return { loading: true }
        case COMPLAINT_DCO_APPROVE_SUCCESS:
            return { loading: false, msg: action.payload }
        case COMPLAINT_DCO_APRROVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const complaintRejectByDcoReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPLAINT_DCO_REJECT_REQUEST:
            return { loading: true }
        case COMPLAINT_DCO_REJECT_SUCCESS:
            return { loading: false, msg: action.payload }
        case COMPLAINT_DCO_REJECT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

