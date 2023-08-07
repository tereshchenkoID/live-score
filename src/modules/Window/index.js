import {useSelector} from "react-redux";

import style from './index.module.scss';

const Window = () => {
    const {match} = useSelector((state) => state.match)
    const {window} = useSelector((state) => state.window)
    const {config} = useSelector((state) => state.config)

    return (
        <div
            className={style.block}
            style={{
                width: `${window.width}px`,
                height: `${window.height}px`,
            }}
        >
            {
                match.id &&
                <iframe
                    className={style.iframe}
                    src={`https://widget.matchtracker.live/?eventID=${match.id}&config=${btoa(JSON.stringify(config))}`}
                    frameBorder="0"
                />
            }
        </div>
    );
}

export default Window;
