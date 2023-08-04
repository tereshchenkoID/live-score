import {useRequest} from "hooks/useRequest";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {setNotification} from "store/actions/notificationAction";
import {compareArrays} from "helpers/compareArrays";
import {setConfig, updateConfig} from "store/actions/configAction";

import Loader from "components/Loader";
import Button from "components/Button";

import style from './index.module.scss';

const BUTTONS = {
    single : {
        value: '0',
        name: 'single'
    },
    double : {
        value: '1',
        name: 'double'
    },
    topdown: {
        value: '2',
        name: 'topdown'
    },
    disable: {
        value: '0',
        name: 'disable'
    },
    enable: {
        value: '1',
        name: 'enable'
    },
    top: {
        value: '1',
        name: 'top'
    },
    bottom: {
        value: '2',
        name: 'bottom'
    },
    auto: {
        value: '0',
        name: 'auto'
    },
    desktop: {
        value: '1',
        name: 'desktop'
    },
    mobile: {
        value: '2',
        name: 'mobile'
    }
}

const OPTIONS = {
    layout: [
        BUTTONS.single, BUTTONS.double, BUTTONS.topdown
    ],
    scoreboard: [
        BUTTONS.enable, BUTTONS.disable
    ],
    statistics: [
        BUTTONS.enable, BUTTONS.disable
    ],
    tabs: [
        BUTTONS.disable, BUTTONS.bottom,
    ],
    mode: [
        BUTTONS.auto, BUTTONS.desktop, BUTTONS.mobile
    ],
    video: [
        BUTTONS.enable, BUTTONS.disable
    ]
}

const Settings = () => {
    const {get} = useRequest()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {auth} = useSelector((state) => state.auth)
    const {config} = useSelector((state) => state.config)
    const [loading, setLoading] = useState(true)
    const [defaults, setDefaults] = useState([])

    const {post} = useRequest()

    useEffect(() => {
        const url = auth ? `/lmt/settings/?token=${auth}` : `/lmt/settings/`

        get(url).then((json) => {
            setDefaults(json)
            initConfig(json)
            setLoading(false)
        })
    }, []);

    const initConfig = (value) => {
        const r = config
        r.settings = value
        dispatch(setConfig(r))
    }

    const handleSubmit = (event) => {
        event && event.preventDefault();

        post(`/lmt/settings/?token=${auth}`, JSON.stringify(config.settings)).then((json) => {
            if (json) {
                dispatch(updateConfig('settings', json))
                setDefaults(json)
                dispatch(setNotification(t('notification.date_update')))
            }
        })
    }

    const updateData = (key, value) => {
        dispatch(updateConfig(`settings.${key}`, value))
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
                                <span>{t('interface.options')}</span>
                            </div>
                            <div className={style.body}>
                                {Object.entries(OPTIONS).map(([key, value], index) => (
                                    <div
                                        className={style.wrapper}
                                        key={index}
                                    >
                                        <div className={style.text}>{key}</div>
                                        <div className={style.options}>
                                            {
                                                value.map((item, idx) =>
                                                    <Button
                                                        key={idx}
                                                        text={t(`interface.${item.name}`)}
                                                        view={config.settings[key] !== item.value && 'outline'}
                                                        action={() => {
                                                            updateData(key, item.value)
                                                        }}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={style.footer}>
                                {
                                    auth &&
                                    <Button
                                        type={'submit'}
                                        text={t('interface.save')}
                                        view={compareArrays(config.settings, defaults) && 'disabled'}
                                    />
                                }
                                <Button
                                    text={t('interface.reset')}
                                    view={compareArrays(config.settings, defaults) && 'disabled'}
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

export default Settings;
