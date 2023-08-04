import {useSelector} from "react-redux";

import style from './index.module.scss';

const Window = ({width}) => {
    const {match} = useSelector((state) => state.match)
    const {config} = useSelector((state) => state.config)

    return (
        <div
            className={style.block}
            style={{
                width: `${width}px`
            }}
        >
            {
                match.id &&
                <iframe
                    className={style.iframe}
                    src={`https://widget.matchtracker.live/?eventID=${match.id}&config=${btoa(JSON.stringify(config))}`} frameBorder="0"
                />
            }
        </div>
    );
}

export default Window;
