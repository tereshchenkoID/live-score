import classNames from "classnames";

import style from './index.module.scss';

const Button = ({
    text,
    view = null,
    type = 'button',
    action
}) => {

    return (
        <button
            className={
                classNames(
                    style.block,
                    style[view]
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
