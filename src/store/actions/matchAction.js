import { types } from "store/actionTypes";

const setMatch = (data) => {
    return {
        type: types.SET_MATCH,
        payload: data
    };
};

export { setMatch };
