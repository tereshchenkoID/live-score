import {useRequest} from "hooks/useRequest";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {setNotification} from "store/actions/notificationAction";
import {compareArrays} from "helpers/compareArrays";
import {setConfig, updateConfig} from "store/actions/configAction";
import {setWindow} from "store/actions/windowAction";

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
    video: [
        BUTTONS.enable, BUTTONS.disable
    ],
    tabs: [
        BUTTONS.top, BUTTONS.bottom,
    ],
    mode: [
        BUTTONS.auto, BUTTONS.desktop, BUTTONS.mobile
    ]
}

const STATS_HEIGHT = {
    '1': 220,
    '3': 260,
    '13': 185,
    '18': 185,
    '91': 220
}

const OPTIONS_HEIGHT = {
    statistics: 42,
    video: 42
}

const DEFAULTS_HEIGHT = {
    scoreboard: 52,
    tabs: 48
}

const getFieldWidth = (data, config) => {
    if (config === BUTTONS.double.value) {
        return data
    }
    else {
        if (data < 280) {
            return 280
        }
        else if(data > 380) {
            return 380
        }
        else {
            return data
        }
    }
}

const Settings = () => {
    const {get} = useRequest()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {auth} = useSelector((state) => state.auth)
    const {match} = useSelector((state) => state.match)
    const {window} = useSelector((state) => state.window)
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

    const setHeight = () => {
       const a = window
       let height = (getFieldWidth(a.width, config.settings.layout) / 1.8) + DEFAULTS_HEIGHT.tabs

       if (config.settings.scoreboard === BUTTONS.enable.value) {
           height += DEFAULTS_HEIGHT.scoreboard
       }

       if (config.settings.layout === BUTTONS.topdown.value) {
           height += STATS_HEIGHT[match.sport_id] || 220

           Object.entries(OPTIONS_HEIGHT).map(([key, value], index) => {
               if (config.settings[key] === BUTTONS.enable.value) {
                   height += OPTIONS_HEIGHT[key]
               }
           })
       }

       a.height = height
       dispatch(setWindow(a))
    }

    const setWidth = () => {
        const a = window
        if (config.settings.layout === BUTTONS.double.value) {
            a.width = 560
        }

        dispatch(setWindow(a))
    }

    useEffect(() => {
        setHeight()
    }, [match, config, window.width])

    useEffect(() => {
        setWidth()
    }, [config.settings.layout])


    const initConfig = (value) => {
        const r = config
        r.settings = value
        dispatch(setConfig(r))


        const a = window
        if (config.settings.layout === BUTTONS.double.value) {
            a.width = 560
        }
        else {
            a.width = 360
        }

        dispatch(setWindow(a))

        setHeight()
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
                                        setHeight()
                                    }}
                                />
                            </div>
                        </form>
            }
        </div>
    );
}

export default Settings;
