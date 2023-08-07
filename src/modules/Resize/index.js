import {useDispatch, useSelector} from "react-redux";

import {iframe} from "constant/config";

import {setWindow} from "store/actions/windowAction";

import Icon from "components/Icon";

import style from './index.module.scss';

const OPTIONS = [
    {
        value: iframe.mobile,
        icon: 'mobile'
    },
    {
        value: iframe.tablet,
        icon: 'tablet'
    },
    {
        value: iframe.desktop,
        icon: 'desktop'
    }
]

const Resize = ({setSettings}) => {
    const {window} = useSelector((state) => state.window)
    const dispatch = useDispatch()

    const handleNumberInputChange = (event) => {
        const newWidth = parseInt(event.target.value);
        const a = window
        a.width = newWidth

        dispatch(setWindow(a))
    };

    const handleRangeInputChange = (event) => {
        const newWidth = parseInt(event.target.value);
        const a = window
        a.width = newWidth

        dispatch(setWindow(a))
    };

    const handleBlur = () => {
        const a = window

        if (window.width < iframe.min) {
            a.width = iframe.min
            dispatch(setWindow(a))
        }
        else if (window.width > iframe.max) {
            a.width = iframe.max
            dispatch(setWindow(a))
        }
    };

    const setWidthValue = (value) => {
        const a = window
        a.width = value

        dispatch(setWindow(a))
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
                <div className={style.header}>Resizer</div>
                <div className={style.body}>
                    <div className={style.options}>
                        {
                            OPTIONS.map((item, index) =>
                                <button
                                    key={index}
                                    className={style.button}
                                    onClick={() =>
                                        setWidthValue(item.value)
                                    }
                                    title={`${item.value}px`}
                                >
                                    <Icon id={`icon-${item.icon}`} />
                                </button>
                            )
                        }
                    </div>

                    <div className={style.row}>
                        <input
                            type="range"
                            value={window.width}
                            className={style.range}
                            onInput={handleRangeInputChange}
                            onBlur={handleBlur}
                            min={iframe.min}
                            max={iframe.max}
                        />
                    </div>

                    <div className={style.row}>
                        <input
                            type="number"
                            value={window.width}
                            className={style.field}
                            onChange={handleNumberInputChange}
                            onBlur={handleBlur}
                            min={iframe.min}
                            max={iframe.max}
                        />
                        <p>px</p>
                    </div>

                    <div className={style.row}>
                        <p>Min. {iframe.min}px | Max. {iframe.max}px</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resize;
