import {useState} from "react";

import classNames from "classnames";

import Icon from "components/Icon";
import Empty from "modules/Empty";
import League from "../League";

import style from './index.module.scss';

const Category = ({ data, index }) => {
    const [active, setActive] = useState(index === 0 ? true : false)

    const groupedElements = data.data.results.reduce((acc, element) => {
        if (!acc[element.league.id]) {
            acc[element.league.id] = {
                name: element.league.name,
                cc: element.league.cc,
                data: [],
            };
        }
        acc[element.league.id].data.push(element);
        return acc;
    }, {});

    return (
        <div className={style.block}>
            <button
                className={
                    classNames(
                        style.title,
                        active && style.active
                    )
                }
                onClick={() => {
                    setActive(!active)
                }}
            >
                <p className={style.text}>{data.name}</p>
                <p className={style.icon}>
                    <Icon id={`sport-${data.id}`} />
                </p>
            </button>
            {
                active &&
                <div>
                    {
                        data.data.results.length === 0
                            ?
                                <Empty />
                            :
                                Object.keys(groupedElements).map((id, idx) => (
                                    <div key={idx}>
                                        <League data={groupedElements[id]}/>
                                    </div>
                                ))
                    }
                </div>
            }
        </div>
    );
}

export default Category;
