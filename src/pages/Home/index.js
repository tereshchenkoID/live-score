import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {setAuth} from "store/actions/authAction";

import classNames from "classnames";

import {iframe} from "constant/config";

import Icon from "components/Icon";
import Theme from "components/Theme";
import Button from "components/Button";
import Sports from "modules/Sports";
import Code from "modules/Code";
import Settings from "modules/Settings";
import Styling from "modules/Styling";
import Languages from "modules/Languages";
import Resize from "modules/Resize";
import Login from "modules/Login";
import Color from "modules/Color";
import Notification from "modules/Notification";
import Window from "modules/Window";

import style from './index.module.scss';

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
]

const Home = ({theme, setTheme}) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {notification} = useSelector((state) => state.notification)
    const {auth} = useSelector((state) => state.auth)
    const [active, setActive] = useState(2)
    const [settings, setSettings] = useState(false)
    const [width, setWidth] = useState(iframe.min);
    const [language, setLanguage] = useState(sessionStorage.getItem('flag') || 'gb')
    const [color, setColor] = useState(sessionStorage.getItem('color') || 'transparent')

    const handleLogin = () => {
        if (auth) {
            sessionStorage.removeItem('token')
            dispatch(setAuth(null))
            setActive(0)
            navigate(0)
        }
        else {
            setSettings(2)
        }
    }

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

                    {
                        auth &&
                        <button
                            className={
                                classNames(
                                    style.link,
                                    active === NAVBAR.length && style.active
                                )
                            }
                            onClick={() => {
                                setActive(NAVBAR.length)
                            }}
                        >
                            {t(`interface.code`)}
                        </button>
                    }
                </div>

                <div className={style.settings}>
                    <div className={style.setting}>
                        <Button
                            text={auth ? t('interface.logout') : t('interface.login')}
                            view={auth && 'warning'}
                            action={handleLogin}
                        />
                    </div>
                    <div className={style.setting}>
                        <Theme
                            data={theme}
                            action={setTheme}
                        />
                    </div>

                    <div className={style.setting}>
                        <button
                            style={{
                                backgroundColor: color
                            }}
                            className={style.color}
                            onClick={() => {
                                setSettings(settings === 3 ? null : 3)
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
                    <div
                        className={
                            classNames(
                                style.toggle,
                                active === 0 && style.active
                            )
                        }
                    >
                        <Sports />
                    </div>
                    <div
                        className={
                            classNames(
                                style.toggle,
                                active === 1 && style.active
                            )
                        }
                    >
                        <Settings />
                    </div>
                    <div
                        className={
                            classNames(
                                style.toggle,
                                active === 2 && style.active
                            )
                        }
                    >
                        <Styling />
                    </div>
                    <div
                        className={
                            classNames(
                                style.toggle,
                                (auth && active === 3) && style.active
                            )
                        }
                    >
                        <Code />
                    </div>
                </aside>

                <div className={style.content}>
                    <Window width={width} />
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
