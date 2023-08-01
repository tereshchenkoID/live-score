import { types } from "store/actionTypes";

const initialState = {
    match: {}
};

const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MATCH:
            return {
                ...state
            };
        case types.SET_MATCH:
            return {
                ...state,
                match: action.payload
            };
        default:
            return state;
    }
};

export default matchReducer;
