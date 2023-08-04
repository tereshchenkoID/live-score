import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {setNotification} from "store/actions/notificationAction";
import {useRequest} from "hooks/useRequest";
import {compareArrays} from "helpers/compareArrays";
import {setConfig, updateConfig} from "store/actions/configAction";

import Loader from "components/Loader";
import Button from "components/Button";
import Color from "./Color";

import style from './index.module.scss';

const Styling = () => {
    const {get} = useRequest()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {auth} = useSelector((state) => state.auth)
    const {config} = useSelector((state) => state.config)
    const [loading, setLoading] = useState(true)
    const [defaults, setDefaults] = useState([])

    const {post} = useRequest()

    useEffect(() => {
        const url = auth ? `/lmt/styling/?token=${auth}` : `/lmt/styling/`

        get(url).then((json) => {
            setDefaults(json)
            initConfig(json)
            setLoading(false)
        })
    }, []);

    const initConfig = (value) => {
        const r = config
        r.styling = value
        dispatch(setConfig(r))
    }

    const handleSubmit = (event) => {
        event && event.preventDefault();

        post(`/lmt/styling/?token=${auth}`, JSON.stringify(config.styling)).then((json) => {
            if (json) {
                dispatch(updateConfig('styling', json))
                setDefaults(json)
                dispatch(setNotification(t('notification.date_update')))
            }
        })
    }

    const updateData = (key, value) => {
        dispatch(updateConfig(`styling.${key}`, value))
    }

    return (
        <div className={style.block}>
            {
                loading
                    ?
                        <Loader type={'block'}/>
                    :
                        <form onSubmit={handleSubmit}>
                            <div className={style.header}>
                                <span>{t('interface.theme')}</span>
                            </div>
                            <div className={style.body}>
                                <div className={style.wrapper}>
                                    <input
                                        className={style.field}
                                        type="text"
                                        value={config.styling.logo.url}
                                        placeholder={'URL'}
                                        onChange={(e) =>
                                            updateData('logo.url', e.target.value)
                                        }
                                    />
                                    <p className={style.notification}>{t('notification.logo')}</p>
                                </div>

                                <div className={style.wrapper}>
                                    {Object.entries(config.styling.colors).map(([key, value], index) => (
                                        <div
                                            key={key}
                                            className={style.item}
                                        >
                                            <Color
                                                label={key}
                                                data={value}
                                                action={(newColor) => {
                                                    updateData(`colors.${key}`, newColor)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.footer}>
                                {
                                    auth &&
                                    <Button
                                        type={'submit'}
                                        text={t('interface.save')}
                                        view={compareArrays(config.styling, defaults) && 'disabled'}
                                    />
                                }
                                <Button
                                    text={t('interface.reset')}
                                    view={compareArrays(config.styling, defaults) && 'disabled'}
                                    action={() => {
                                        initConfig(defaults)
                                    }}
                                />
                            </div>
                        </form>
            }
        </div>
    );
}

export default Styling;
