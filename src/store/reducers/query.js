import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    loading: false,
    error: '',
    collection: null,
    searchQuery: ''
}

const imageSearchStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: '', collection: null, searchQuery: ''})
}

const imageSearchSuccess = ( state, action ) => {
    return updateObject( state, { 
        collection: action.collection, 
        searchQuery: action.query,
        loading: false 
    })
}

const imageSearchError = ( state, action ) => {
    return updateObject( state, { 
        error: action.error,
        query: action.query,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_IMAGES_START: return imageSearchStart(state, action)
        case actionTypes.FETCH_IMAGES_SUCCESS: return imageSearchSuccess(state, action)
        case actionTypes.FETCH_IMAGES_ERROR: return imageSearchError(state, action)         
        default: return state
    }
}

export default reducer