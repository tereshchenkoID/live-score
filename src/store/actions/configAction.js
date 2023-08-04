import { types } from "store/actionTypes";

const setConfig = (data) => {
    return {
        type: types.SET_CONFIG,
        payload: data
    };
};

const updateConfig = (key, data) => {
    return {
        type: types.UPDATE_CONFIG,
        payload: {key, data},
    };
};


export { setConfig, updateConfig };
