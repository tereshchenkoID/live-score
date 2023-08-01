import {useTranslation} from "react-i18next";

import Icon from "components/Icon";

import style from './index.module.scss';

const Empty = ({text = null}) => {
    const { t } = useTranslation()

    return (
        <div className={style.block}>
            <div className={style.icon}>
                <Icon id={'icon-list'}/>
            </div>
            <p className={style.text}>{text || t('interface.match_enable')}</p>
        </div>
    );
}

export default Empty;
