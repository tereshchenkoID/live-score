import { types } from "store/actionTypes";

const initialState = {
    window: {
        width: 360,
        height: 'auto'
    }
};

const windowReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_WINDOW:
            return {
                ...state
            };
        case types.SET_WINDOW:
            return {
                ...state,
                window: action.payload
            };
        default:
            return state;
    }
};

export default windowReducer;
