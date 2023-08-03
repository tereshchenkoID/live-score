import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux";
import {setData} from "store/actions/dataAction";

import Loader from "components/Loader";
import Category from "./Category";

import style from './index.module.scss';

const Sports = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {data} = useSelector((state) => state.data)

    useEffect(() => {
        dispatch(setData()).then(() => {
            setLoading(false)
        })

        setInterval(() => {
            dispatch(setData())
        }, 30000)

    }, []);

    return (
        <div
            className={style.block}
        >
            {
                loading
                ?
                    <Loader type={'block'}/>
                :
                    <>
                        {
                            data.sports.map((item, index) =>
                                <div key={index}>
                                    <Category
                                        data={item}
                                        index={index}
                                    />
                                </div>
                            )
                        }
                    </>
            }

        </div>
    );
}

export default Sports;
