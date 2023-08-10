import {useSelector} from "react-redux";

import style from './index.module.scss';

const Window = () => {
    const {match} = useSelector((state) => state.match)
    const {window} = useSelector((state) => state.window)
    const {config} = useSelector((state) => state.config)

    const src = match.id ? `https://widget.matchtracker.live/?eventID=${match.id}&config=${btoa(JSON.stringify(config))}` : `https://widget.matchtracker.live/?config=${btoa(JSON.stringify(config))}`

    return (
        <div
            className={style.block}
            style={{
                width: `${window.width}px`,
                height: `${window.height}px`,
            }}
        >
            <iframe
                title="Window"
                className={style.iframe}
                src={src}
                frameBorder="0"
            />
        </div>
    );
}

export default Window;
