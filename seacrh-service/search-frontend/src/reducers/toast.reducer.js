import {HIDE_TOAST, SHOW_TOAST} from "../actions";

const initialState = {
    toasts: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SHOW_TOAST: {
            return {
                ...state,
                toasts: [...state.toasts, action.payload]
            }
        }
        case HIDE_TOAST: {
            const index = action.payload;
            const toasts = [...state.toasts];
            toasts.splice(index, 1);

            return {
                ...state,
                toasts: [...toasts]
            }
        }
    }

    return initialState;
}