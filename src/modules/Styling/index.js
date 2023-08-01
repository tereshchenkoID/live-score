import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {useRequest} from "hooks/useRequest";
import {compareArrays} from "helpers/compareArrays";

import Loader from "components/Loader";
import Color from "./Color";

import style from './index.module.scss';

const Styling = () => {
    const {get} = useRequest()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [defaults, setDefaults] = useState([])

    useEffect(() => {
        get('/lmt/styling/').then((json) => {
            setData(json)
            setDefaults(json)

            setLoading(false)
        })
    }, []);

    const updateData = (key, data) => {
        setData((prev) => ({ ...prev, [key]: data }));
    }

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader type={'block'}/>
                    :
                        <>
                            <div className={style.header}>
                                <span>{t('interface.theme')}</span>
                            </div>
                            <div className={style.body}>
                                <div className={style.wrapper}>
                                    <input
                                        className={style.field}
                                        type="text"
                                        value={data.logo.url}
                                        placeholder={'URL'}
                                        onChange={(e) =>
                                            updateData('logo', { ...data.logo, url: e.target.value })
                                        }
                                    />
                                    <p className={style.notification}>{t('notification.logo')}</p>
                                </div>

                                <div className={style.wrapper}>
                                    {Object.entries(data.colors).map(([key, value], index) => (
                                        <div
                                            key={key}
                                            className={style.item}
                                        >
                                            <Color
                                                label={key}
                                                data={value}
                                                action={(newColor) => {
                                                    updateData('colors', { ...data.colors, [key]: newColor })
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.footer}>
                                <button
                                    className={
                                        classNames(
                                            style.button,
                                            style.disabled
                                        )
                                    }
                                >
                                    {t('interface.save')}
                                </button>
                                <button
                                    className={
                                        classNames(
                                            style.button,
                                            compareArrays(data, defaults) && style.disabled
                                        )
                                    }
                                    onClick={() => {
                                        setData(defaults)
                                    }}
                                >
                                    {t('interface.reset')}
                                </button>
                            </div>
                        </>
            }
        </div>
    );
}

export default Styling;
