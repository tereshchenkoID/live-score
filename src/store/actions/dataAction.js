import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

export const setData = () => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get('/lmt/feed/')
        dispatch({
            type: types.SET_DATA,
            payload: data,
        })

        return data
    }
    catch (e) {
        console.log(e)
    }
};
