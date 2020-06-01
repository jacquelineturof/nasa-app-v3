import * as actionTypes from './actionTypes'

import axios from '../../axios-nasa'

// Image Search

export const fetchImagesStart = () => {
    return {
        type: actionTypes.FETCH_IMAGES_START
    }
}

export const fetchImagesError = (error, query) => {
    return {
        type: actionTypes.FETCH_IMAGES_ERROR,
        error,
        query
    }
}

export const fetchImagesSuccess = (collection, query) => {
    return {
        type: actionTypes.FETCH_IMAGES_SUCCESS,
        collection,
        query
    }
}

export const queryImageSearch = query => {
    return async dispatch => {
        dispatch(fetchImagesStart())
        try {
            const response = await axios.get(`search?q=${query}`)

            if (!response) throw new Error('Could not process request')
            dispatch(fetchImagesSuccess(response.data.collection.items, query))
        } catch (e) {
            dispatch(fetchImagesError(e.message, query))
        }
    }
}