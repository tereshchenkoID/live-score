import {useRequest} from "hooks/useRequest";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {setNotification} from "store/actions/notificationAction";
import {setAuth} from "store/actions/authAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const Login = ({setSettings}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')

    const {post} = useRequest()

    const handleSubmit = (event) => {
        event && event.preventDefault();

        post(
            '/lmt/login/',
            JSON.stringify({
                username,
                password
            })
        ).then((json) => {
            if (json.code === 'OK') {
                console.log(json.token)
                sessionStorage.setItem('token', json.token)
                dispatch(setAuth(json.token))
                setSettings(null)
            }
            else {
                dispatch(setNotification(t('notification.wrong_login_password')))
            }
        })
    }

    return (
        <div className={style.block}>
            <div
                className={style.shadow}
                onClick={() => {
                    setSettings(null)
                }}
            />
            <div className={style.wrapper}>
                <button
                    className={style.close}
                    onClick={() => {
                        setSettings(null)
                    }}
                >
                    <Icon id={'icon-close'} />
                </button>
                <form
                    className={style.form}
                    onSubmit={handleSubmit}
                >
                    <div className={style.row}>
                        <p className={style.text}>{t('interface.username')}</p>
                        <input
                            type="text"
                            className={style.field}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                            required={true}
                        />
                    </div>
                    <div className={style.row}>
                        <p className={style.text}>{t('interface.password')}</p>
                        <div className={style.overflow}>
                            <input
                                type={type}
                                className={style.field}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                required={true}
                            />
                            <button
                                className={style.icon}
                                type={'button'}
                                onClick={() => {
                                    setType(type === 'password' ? 'text' : 'password')
                                }}
                            >
                                <Icon id={'icon-eye'} />
                            </button>
                        </div>
                    </div>
                    <div className={style.row}>
                        <button
                            className={style.button}
                            type={'submit'}
                        >
                            {t('interface.sign_in')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
