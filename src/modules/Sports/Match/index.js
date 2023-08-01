import {useDispatch, useSelector} from "react-redux";

import classNames from "classnames";

import {setMatch} from "store/actions/matchAction";

import style from './index.module.scss';

const getPeriod = (data) => {
    switch (data) {
        case 0:
            return '1h'
        case 1:
            return '2h'
        case 2:
            return '1ext'
        case 3:
            return '2ext'
        case 4:
            return 'p'
        default:
            return '1st'
    }
}

const getScoreSet = (data) => {
    const scoresArray1 = [];
    const scoresArray2 = [];
    const a = data.split(',')

    if (data.indexOf('-') !== -1) {
        a.forEach((item) => {
            const score = item.split('-');

            scoresArray1.push(score[0]);
            scoresArray2.push(score[1]);
        });
    }
    else {
        scoresArray1.push(a[0]);
        scoresArray2.push(a[1]);
    }

    return [scoresArray1, scoresArray2];
}

const Match = ({data}) => {
    const dispatch = useDispatch()
    const {match} = useSelector((state) => state.match)

    return (
        <div
            className={
                classNames(
                    style.block,
                    match.id === data.id && style.active
                )
            }
            onClick={() => {
                dispatch(setMatch(data))
            }}
        >
            <div className={style.cell}>
                {
                    data.timer
                        ?
                            <>
                                <div>{getPeriod(data.timer.md)}</div>
                                <div>
                                    <div className={style.time}>{data.timer.tm}'</div>
                                </div>
                            </>
                        :
                        <>
                            <div>{getScoreSet(data.ss)[0].length}s</div>
                        </>
                }
            </div>
            <div className={style.cell}>
                <div>
                    <div className={style.text}>{data.home.name}</div>
                </div>
                <div>
                    <div className={style.text}>{data.away.name}</div>
                </div>
            </div>
            <div className={style.cell}>
                {
                    data.ss &&
                    <>
                        <div className={style.row}>
                            {
                                data.playing_indicator &&
                                <div className={style.th}>
                                    {
                                        data.playing_indicator.split(',')[0] === '1' &&
                                        <div className={style.indicator} />
                                    }
                                </div>
                            }
                            {
                                data.points &&
                                <div className={style.th}>
                                    <strong>{data.points.split('-')[0]}</strong>
                                </div>
                            }
                            {getScoreSet(data.ss)[0].map((score, index) => (
                                <div
                                    key={index}
                                    className={style.th}
                                >
                                    {score}
                                </div>
                            ))}
                        </div>
                        <div className={style.row}>
                            {
                                data.playing_indicator &&
                                <div className={style.th}>
                                    {
                                        data.playing_indicator.split(',')[1] === '1' &&
                                        <div className={style.indicator} />
                                    }
                                </div>
                            }
                            {
                                data.points &&
                                <div className={style.th}>
                                    <strong>{data.points.split('-')[1]}</strong>
                                </div>
                            }
                            {getScoreSet(data.ss)[1].map((score, index) => (
                                <div
                                    className={style.th}
                                    key={index}
                                >
                                    {score}
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Match;
