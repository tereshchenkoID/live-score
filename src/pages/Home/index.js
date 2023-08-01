import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import classNames from "classnames";

import {iframe} from "constant/config";

import Icon from "components/Icon";
import Sports from "modules/Sports";
import Code from "modules/Code";
import Settings from "modules/Settings";
import Styling from "modules/Styling";
import Languages from "modules/Languages";
import Resize from "modules/Resize";
import Login from "modules/Login";
import Color from "modules/Color";
import Notification from "modules/Notification";

import style from './index.module.scss';

const getContent = (type) => {
    switch (type) {
        case 0:
            return <Sports />
        case 1:
            return <Settings/>
        case 2:
            return <Styling/>
        case 3:
            return <Code/>
        default:
            return <Sports/>
    }
}

const NAVBAR = [
    {
        id: 0,
        name: 'sports',
    },
    {
        id: 1,
        name: 'settings',
    },
    {
        id: 2,
        name: 'styling',
    },
    {
        id: 3,
        name: 'code',
    }
]


const Home = () => {
    const { t } = useTranslation()
    const {notification} = useSelector((state) => state.notification)
    const [active, setActive] = useState(0)
    const [settings, setSettings] = useState(false)
    const [width, setWidth] = useState(iframe.min);
    const [language, setLanguage] = useState('gb')
    const [color, setColor] = useState(sessionStorage.getItem('color') || 'transparent')

    return (
        <div
            style={{
                backgroundColor: color
            }}
            className={style.block}
        >
            <nav className={style.navbar}>
                <div className={style.links}>
                    {
                        NAVBAR.map((item, index) =>
                            <button
                                key={index}
                                className={
                                    classNames(
                                        style.link,
                                        active === item.id && style.active
                                    )
                                }
                                onClick={() => {
                                    setActive(item.id)
                                }}
                            >
                                {t(`interface.${item.name}`)}
                            </button>
                        )
                    }
                </div>

                <div className={style.settings}>
                    <div className={style.setting}>
                        <button
                            className={style.login}
                            onClick={() => {
                                setSettings(2)
                            }}
                        >
                            {t('interface.login')}
                        </button>
                    </div>

                    <div className={style.setting}>
                        <button
                            style={{
                                backgroundColor: color
                            }}
                            className={style.color}
                            onClick={() => {
                                setSettings(3)
                            }}
                        />
                    </div>

                    <button
                        className={style.setting}
                        onClick={() => {
                            setSettings(settings === 0 ? null : 0)
                        }}
                    >
                        <span className={style.icon}>
                            <Icon id={'icon-resize'}/>
                        </span>
                    </button>

                    <button
                        className={style.setting}
                        onClick={() => {
                            setSettings(1)
                        }}
                    >
                        <span className={style.language}>
                            <img src={`https://img.sportradar.com/ls/crest/big/${language}.png`} alt={language} />
                        </span>
                    </button>
                </div>

                {
                    settings === 0 &&
                    <Resize
                        width={width}
                        setWidth={setWidth}
                        setSettings={setSettings}
                    />
                }

                {
                    settings === 1 &&
                    <Languages
                        setSettings={setSettings}
                        setLanguage={setLanguage}
                    />
                }

                {
                    settings === 2 &&
                    <Login setSettings={setSettings} />
                }

                {
                    settings === 3 &&
                    <Color
                        color={color}
                        action={setColor}
                        setSettings={setSettings}
                    />
                }
            </nav>

            <div className={style.wrapper}>
                <aside className={style.aside}>
                    {getContent(active)}
                </aside>

                <div className={style.content}>
                    <div
                        className={style.window}
                        style={{
                            width: `${width}px`
                        }}
                    />
                </div>
            </div>

            {
                notification &&
                <Notification
                    text={notification}
                />
            }
        </div>
    );
}

export default Home;
