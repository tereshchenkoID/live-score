import {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";

import {useRequest} from "hooks/useRequest";

import Icon from "components/Icon";
import Loader from "components/Loader";

import style from './index.module.scss';

const Languages = ({setSettings, setLanguage}) => {
    const { i18n } = useTranslation()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {get} = useRequest()

    useEffect(() => {
        get('/lmt/language/').then((json) => {
            setData(json.doc[0].data)
            setLoading(false)
        })
    }, []);

    const changeLanguage = (iso, a2) => {
        i18n.changeLanguage(iso);
        setSettings(null)
        setLanguage(a2)
        sessionStorage.setItem('language', iso)
        sessionStorage.setItem('flag', a2)
    };

    return (
        <div className={style.block}>
            <div
                className={style.shadow}
                onClick={() => {
                    setSettings(null)
                }}
            />
            <div className={style.wrapper}>
                {
                    loading
                        ?
                            <Loader type={'block'} />
                        :
                            <>
                                <button
                                    className={style.close}
                                    onClick={() => {
                                        setSettings(null)
                                    }}
                                >
                                    <Icon id={'icon-close'} />
                                </button>
                                <div className={style.map}>
                                    <Icon id={'icon-map'}/>
                                </div>
                                <div className={style.title}>{t(`interface.choose_language`)}</div>
                                <div className={style.list}>
                                    {
                                        data.map((item, index) =>
                                            <button
                                                key={index}
                                                className={style.item}
                                                onClick={() => {
                                                    changeLanguage(item.isocode, item.cc.a2)
                                                }}
                                            >
                                                <span className={style.icon}>
                                                    <img src={`https://img.sportradar.com/ls/crest/big/${item.cc.a2}.png`} alt={item.name} />
                                                </span>
                                                <span>{item.name}</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </>
                }

            </div>
        </div>
    );
}

export default Languages;
