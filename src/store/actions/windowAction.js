import { types } from "store/actionTypes";

const setWindow = (data) => {
    return {
        type: types.SET_WINDOW,
        payload: data
    };
};

export { setWindow };
