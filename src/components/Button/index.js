import classNames from "classnames";

import style from './index.module.scss';

const Button = ({
    text,
    view = null,
    type = 'button',
    action,
    disabled
}) => {

    return (
        <button
            className={
                classNames(
                    style.block,
                    style[view],
                    disabled && style.disabled
                )
            }
            type={type}
            onClick={() => {
                action()
            }}
        >
            {text}
        </button>
    );
}

export default Button;
