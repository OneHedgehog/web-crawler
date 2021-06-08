import { CHANGE_PAGE } from "../actions";

const initialState = {
    page: 1
};

export default function(state = initialState, action) {

    switch (action.type) {
        case CHANGE_PAGE: {
            const { page } = action.payload;

            return {
                ...state,
                page, page
            }
        }
        default: {
            return state;
        }
    }
}