import {useRequest} from "hooks/useRequest";

import { types } from "store/actionTypes";

export const setData = () => async dispatch => {
    const { get } = useRequest();

    try {
        const data = await get('/all.php')
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
