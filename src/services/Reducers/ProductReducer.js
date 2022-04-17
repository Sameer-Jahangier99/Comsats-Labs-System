import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    FIND_PRODUCT_REQUEST,
    FIND_PRODUCT_SUCCESS,
    FIND_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL
} from '../constants/ProductConstants'


export const allProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return { loading: true }
        case ALL_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload }
        case ALL_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return { loading: true }
        case ADD_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case ADD_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const findProductReducer = (state = {}, action) => {
    switch (action.type) {
        case FIND_PRODUCT_REQUEST:
            return { loading: true }
        case FIND_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case FIND_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return { loading: true }
        case UPDATE_PRODUCT_SUCCESS:
            return { loading: false, result: action.payload }
        case UPDATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}