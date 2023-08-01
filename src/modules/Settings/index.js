import {useRequest} from "hooks/useRequest";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import classNames from "classnames";

import {compareArrays} from "helpers/compareArrays";

import Loader from "components/Loader";

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
        BUTTONS.bottom, BUTTONS.top, BUTTONS.disable
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
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [defaults, setDefaults] = useState([])

    useEffect(() => {
        get('/lmt/settings/').then((json) => {
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
                                                    <button
                                                        key={idx}
                                                        className={
                                                            classNames(
                                                                style.button,
                                                                data[key] === item.value && style.active
                                                            )
                                                        }
                                                        onClick={() => {
                                                            updateData(key, item.value)
                                                        }}
                                                    >
                                                        {t(`interface.${item.name}`)}
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={style.footer}>
                                <button
                                    className={
                                        classNames(
                                            style.button,
                                            style.active,
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
                                            style.active,
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

export default Settings;
