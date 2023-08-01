import {ChromePicker} from "react-color";

import style from './index.module.scss';

const Resize = ({color, action, setSettings}) => {
    const handleChange = (newColor) => {
        action(newColor.hex)
        sessionStorage.setItem('color', newColor.hex)
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
                <ChromePicker
                    color={color}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default Resize;
