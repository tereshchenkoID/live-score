import { types } from "store/actionTypes";

const initialState = {
    config: {
        styling: {},
        settings: {},
    }
};


const updateNestedField = (obj, keys, value) => {
    if (keys.length === 1) {
        return { ...obj, [keys[0]]: value };
    }

    const [currentKey, ...remainingKeys] = keys;
    return {
        ...obj,
        [currentKey]: updateNestedField(obj[currentKey], remainingKeys, value),
    };
};

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CONFIG:
            return {
                ...state
            };
        case types.UPDATE_CONFIG:
            return {
                ...state,
                config: updateNestedField(state.config, action.payload.key.split('.'), action.payload.data),
            };
        case types.SET_CONFIG:
            return {
                ...state,
                config: action.payload
            };
        default:
            return state;
    }
};

export default configReducer;
