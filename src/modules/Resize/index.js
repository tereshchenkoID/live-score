import {iframe} from "constant/config";

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

const Resize = ({width, setWidth, setSettings}) => {
    const handleNumberInputChange = (event) => {
        const newWidth = parseInt(event.target.value);
        setWidth(newWidth);
    };

    const handleRangeInputChange = (event) => {
        const newWidth = parseInt(event.target.value);
        setWidth(newWidth);
    };

    const handleBlur = () => {
        if (width < iframe.min) {
            setWidth(iframe.min);
        } else if (width > iframe.max) {
            setWidth(iframe.max);
        }
    };

    const setWidthValue = (value) => {
        setWidth(value);
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
                            value={width}
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
                            value={width}
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
