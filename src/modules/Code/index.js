import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import Button from "components/Button";

import style from './index.module.scss';

const Code = () => {
    const { t } = useTranslation()
    const {auth} = useSelector((state) => state.auth)

    return (
        <div className={style.block}>
            <div className={style.header}>Code</div>
            <div className={style.body}>
                <div className={style.wrapper}>
                    <input
                        className={style.field}
                        type="text"
                        value={auth}
                        placeholder={'URL'}
                        readOnly={true}
                    />
                    <p className={style.notification}>{t('notification.code')}</p>
                </div>
            </div>
            <div className={style.footer}>
                <Button
                    type={'button'}
                    text={t('interface.download')}
                />
            </div>
        </div>
    );
}

export default Code;
