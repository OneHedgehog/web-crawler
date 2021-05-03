import { SEARCH_REQUEST, SEARCH_REQUEST_FAILURE, SEARCH_REQUEST_SUCCESS } from "../actions";

const initialState = {
    query: '',
    searchData: [],
    error: {}

};

export default function(state = initialState, action) {

    switch (action.type) {
        case SEARCH_REQUEST: {
            const { query } = action.payload;

            return {
                ...state,
                query: query,
                isLoading: true,
            }
        }

        case SEARCH_REQUEST_SUCCESS: {
            const { data } = action.payload;

            return {
                ...state,
                searchData: data
            }
        }

        case SEARCH_REQUEST_FAILURE: {
            const { error } = action.payload;

            return {
                ...state,
               error
            }
        }

        default: {
            return state;
        }
    }
}