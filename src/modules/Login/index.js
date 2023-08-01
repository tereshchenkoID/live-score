import {useTranslation} from "react-i18next";

import Icon from "components/Icon";

import style from './index.module.scss';

const Login = ({setSettings}) => {
    const { t } = useTranslation()

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
                <div className={style.row}>
                    <p className={style.text}>{t('interface.username')}</p>
                    <input
                        type="text"
                        className={style.field}
                        required={true}
                    />
                </div>
                <div className={style.row}>
                    <p className={style.text}>{t('interface.password')}</p>
                    <input
                        type="password"
                        className={style.field}
                        required={true}
                    />
                </div>
                <div className={style.row}>
                    <button
                        className={style.button}
                    >
                        {t('interface.sign_in')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
