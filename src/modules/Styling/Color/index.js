import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import { ChromePicker } from 'react-color';

import useOutsideClick from "hooks/useOutsideClick";

import style from './index.module.scss';

const Color = ({label, data, action}) => {
    const { t } = useTranslation()
    const [active, setActive] = useState(false)
    const popupRef = useRef();
    const buttonRef = useRef()

    const handleChange = (newColor) => {
        action(newColor.hex);
    };

    useOutsideClick(popupRef, buttonRef,() => {
        if(active) setActive(false)
    });

    return (
        <div
            style={{
                zIndex: active ? 1 : 0
            }}
            className={style.block}
        >
            <div className={style.label}>{t(`interface.${label}`)}</div>
            <button
                ref={buttonRef}
                className={style.button}
                onClick={() => {
                    setActive(!active)
                }}
            >
                <div>{data}</div>
                <div
                    style={{
                        backgroundColor: data
                    }}
                    className={style.color}
                />
            </button>
            {
                active &&
                <div
                    className={style.popup}
                    ref={popupRef}
                >
                    <ChromePicker
                        color={data}
                        onChange={handleChange}
                    />
                </div>
            }
        </div>
    );
}

export default Color;
